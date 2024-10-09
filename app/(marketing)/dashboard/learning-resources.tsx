'use client';

import { Table } from '@/components/organisms';
import { LearningResourceItem } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import useSWRImmutable from 'swr/immutable';

interface LearningResourceQuery {
  rows: Omit<LearningResourceItem, 'pos'>[];
}

interface FormElements
  extends HTMLFormControlsCollection,
    Omit<LearningResourceItem, 'id' | 'pos'> {}
interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const TableKeyContext = React.createContext<{
  tableKey: number;
  setTableKey: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

interface TableKeyProviderProps {
  children: React.ReactNode;
}

export const LearningResourceTableKeyProvider: React.FC<
  TableKeyProviderProps
> = ({ children }) => {
  const [tableKey, setTableKey] = React.useState(0);
  return (
    <TableKeyContext.Provider value={{ tableKey, setTableKey }}>
      {children}
    </TableKeyContext.Provider>
  );
};

const useTableKey = () => {
  const context = React.useContext(TableKeyContext);
  if (!context) {
    throw new Error('useTableKey must be used within a TableKeyProvider');
  }
  return context;
};

const useLearningResources = () => {
  const { tableKey, setTableKey } = useTableKey();
  const remountTable = () => {
    setTableKey((prev) => prev + 1);
  };
  const { data, error, mutate, isLoading } =
    useSWRImmutable<LearningResourceQuery>('/api/learning-resources', {
      onSuccess: remountTable, // This will trigger a re-render of the table component to reorder the TR's within the table element
    });
  return { data, error, mutate, tableKey, isLoading };
};

export const LearningResourceForm = () => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const { data, mutate } = useLearningResources();
  const onSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Create a new item with Temp image stored in the browser
    const newData = {
      rows: data
        ? [
            ...data.rows,
            {
              id: '0',
              title: formData.get('title') as string,
              link: formData.get('link') as string,
            },
          ]
        : [
            {
              id: '0',
              title: formData.get('title') as string,
              link: formData.get('link') as string,
            },
          ],
    };

    // Optimistically add the new item to the list, send the request
    mutate(
      async () => {
        await fetch('/api/learning-resources', {
          method: 'POST',
          body: formData,
        });
        return newData;
      },
      {
        optimisticData: newData,
      },
    );

    dialogRef.current?.close();
  };
  return (
    <div className="w-full pb-md">
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="w-full whitespace-nowrap rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-lg py-sm text-button text-light-primary transition-all duration-100 ease-in-out hover:opacity-75"
      >
        Add
      </button>
      <dialog
        ref={dialogRef}
        className="invisible flex translate-y-10 flex-col overflow-auto rounded-md border-line-width border-dashed border-light-primary bg-light-background p-md opacity-0 drop-shadow-2xl transition-all duration-100 ease-in-out open:visible open:translate-y-0 open:opacity-100"
      >
        <div className="flex w-full justify-between gap-md pb-lg">
          <p>
            <b>Add Learning Resource</b>
          </p>
          <button onClick={() => dialogRef.current?.close()}>
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
        <form name="learning-resource" className="w-full" onSubmit={onSubmit}>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Title *
            <input
              className="w-full rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
              required
              name="title"
              placeholder="Learning Resource Title"
              type="text"
            />
          </label>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Link *
            <input
              className="w-full rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
              required
              name="link"
              placeholder="https://example.com"
              type="url"
            />
          </label>
          <button
            type="submit"
            className="w-full whitespace-nowrap rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-lg py-sm text-button text-light-primary transition-all duration-100 ease-in-out hover:opacity-75"
          >
            Add
          </button>
        </form>
      </dialog>
    </div>
  );
};

export const LearningResourceTable = () => {
  const { data, error, mutate, tableKey, isLoading } = useLearningResources();
  const onClickDelete = async (id: string) => {
    const newData = {
      rows: data?.rows.filter((row) => row.id !== id) || [],
    };
    mutate(
      async () => {
        await fetch(`/api/learning-resources/${id}`, {
          method: 'DELETE',
        });
        return newData;
      },
      {
        optimisticData: newData,
      },
    );
  };

  const onReorder = async (
    affectedIds: [string | null, string, string | null],
  ) => {
    const [beforeId, sourceId, afterId] = affectedIds;
    mutate(
      async () => {
        await fetch(`/api/learning-resources/${sourceId}`, {
          method: 'PATCH',
          body: JSON.stringify({ beforeId, afterId }),
        });
        return data;
      },
      {
        revalidate: false,
      },
    );
  };
  return (
    <Table
      key={tableKey}
      data={data}
      error={error}
      draggable
      isLoading={isLoading}
      reorderCallback={onReorder}
      onClickDelete={onClickDelete}
    />
  );
};
