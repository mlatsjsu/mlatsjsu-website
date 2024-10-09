'use client';

import { Table } from '@/components/organisms';
import { blobToBase64 } from '@/lib/blobToBase64';
import { ProjectItem } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import useSWRImmutable from 'swr/immutable';

interface ProjectQuery {
  rows: Omit<ProjectItem, 'pos'>[];
}

interface FormElements
  extends HTMLFormControlsCollection,
    Omit<ProjectItem, 'id' | 'pos'> {}
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

export const ProjectTableKeyProvider: React.FC<TableKeyProviderProps> = ({
  children,
}) => {
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

const useProjects = () => {
  const { tableKey, setTableKey } = useTableKey();
  const remountTable = () => {
    setTableKey((prev) => prev + 1);
  };
  const { data, error, mutate, isLoading } = useSWRImmutable<ProjectQuery>(
    '/api/projects',
    {
      onSuccess: remountTable, // This will trigger a re-render of the table component to reorder the TR's within the table element
    },
  );
  return { data, error, mutate, tableKey, isLoading };
};

export const ProjectForm = () => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const { data, mutate } = useProjects();
  const onSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Create a new item with Temp image stored in the browser
    const tempImage = URL.createObjectURL(formData.get('image') as Blob);
    const newData = {
      rows: data
        ? [
            ...data.rows,
            {
              id: '0',
              title: formData.get('title') as string,
              description: formData.get('description') as string,
              image: tempImage,
            },
          ]
        : [
            {
              id: '0',
              title: formData.get('title') as string,
              description: formData.get('description') as string,
              image: tempImage,
            },
          ],
    };

    // Convert image to base64 for Cloudinary
    const base64Image = await blobToBase64(formData.get('image') as Blob);
    formData.delete('image');
    if (typeof base64Image === 'string') {
      formData.append('image', base64Image);
    }

    // Optimistically add the new item to the list, send the request
    mutate(
      async () => {
        await fetch('/api/projects', {
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
            <b>Add Project</b>
          </p>
          <button onClick={() => dialogRef.current?.close()}>
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
        <form name="project" className="w-full" onSubmit={onSubmit}>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Title *
            <input
              className="w-full rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
              required
              name="title"
              placeholder="Project Title"
              type="text"
            />
          </label>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Description *
            <textarea
              className="w-full rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
              required
              name="description"
              placeholder="Project Description"
            />
          </label>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Image *
            <input
              className="w-full text-p file:mr-md file:cursor-pointer file:rounded-sm file:border-none file:bg-light-primary file:px-4 file:py-2 file:text-button file:font-semibold file:text-light-background file:transition-all file:duration-100 file:ease-in-out hover:file:opacity-75"
              required
              name="image"
              accept="image/png, image/gif, image/jpeg"
              type="file"
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

export const ProjectTable = () => {
  const { data, error, mutate, tableKey, isLoading } = useProjects();
  const dataWithImage = data
    ? {
        rows: data.rows.map((row) => ({
          ...row,
          image: (
            <div className="flex flex-wrap gap-md overflow-x-auto">
              <Image
                src={row.image}
                alt={row.title}
                className="h-[100px] w-auto object-contain"
                width={100}
                height={100}
              />
            </div>
          ),
        })),
      }
    : undefined;

  const onClickDelete = async (id: string) => {
    const newData = {
      rows: data?.rows.filter((row) => row.id !== id) || [],
    };
    mutate(
      async () => {
        await fetch(`/api/projects/${id}`, {
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
        await fetch(`/api/projects/${sourceId}`, {
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
      data={dataWithImage}
      error={error}
      draggable
      isLoading={isLoading}
      reorderCallback={onReorder}
      onClickDelete={onClickDelete}
    />
  );
};
