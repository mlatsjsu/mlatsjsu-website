'use client';

import { Table } from '@/components/organisms';
import { blobToBase64 } from '@/lib/blobToBase64';
import { SpotlightItem } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import useSWRImmutable from 'swr/immutable';

interface SpotlightQuery {
  rows: Omit<SpotlightItem, 'pos'>[];
}

interface FormElements
  extends HTMLFormControlsCollection,
    Omit<SpotlightItem, 'id' | 'pos'> {}
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

export const SpotlightTableKeyProvider: React.FC<TableKeyProviderProps> = ({
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

const useSpotlights = () => {
  const { tableKey, setTableKey } = useTableKey();
  const remountTable = () => {
    setTableKey((prev) => prev + 1);
  };
  const { data, error, mutate, isLoading } = useSWRImmutable<SpotlightQuery>(
    '/api/spotlights',
    {
      onSuccess: remountTable, // This will trigger a re-render of the table component to reorder the TR's within the table element
    },
  );
  return { data, error, mutate, tableKey, isLoading };
};

export const SpotlightForm = () => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const { data, isLoading, mutate } = useSpotlights();
  const onSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Create a new item with Temp images stored in the browser
    const tempImages = formData
      .getAll('images')
      .map((image) => URL.createObjectURL(image as Blob));
    const newData = {
      rows: data
        ? [
            ...data.rows,
            {
              id: '0',
              title: formData.get('title') as string,
              images: tempImages,
            },
          ]
        : [
            {
              id: '0',
              title: formData.get('title') as string,
              images: tempImages,
            },
          ],
    };

    // Convert images to base64 for Cloudinary
    const base64Images = await Promise.all(
      formData.getAll('images').map(async (image) => {
        const base64Img = await blobToBase64(image as Blob);
        return base64Img;
      }),
    );
    formData.delete('images');
    base64Images.forEach((image) => {
      if (typeof image === 'string') {
        formData.append('images', image);
      }
    });

    // Optimistically add the new item to the list, send the request
    mutate(
      async () => {
        await fetch('/api/spotlights', {
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
            <b>Add Spotlight</b>
          </p>
          <button onClick={() => dialogRef.current?.close()}>
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
        <form name="spotlights" className="w-full" onSubmit={onSubmit}>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Title *
            <input
              className="w-full rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
              required
              name="title"
              placeholder="Spotlight title"
              type="text"
            />
          </label>
          <label className="flex flex-1 flex-col gap-xs pb-md">
            Images *
            <input
              className="file:text-sm w-full text-small-lg file:mr-md file:cursor-pointer file:rounded-sm file:border-none file:bg-light-primary file:px-4 file:py-2 file:font-semibold file:text-light-background file:transition-all file:duration-100 file:ease-in-out hover:file:opacity-75"
              required
              name="images"
              accept="image/png, image/gif, image/jpeg"
              type="file"
              multiple
            />
          </label>
          <button
            disabled={isLoading}
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

export const SpotlightTable = () => {
  const { data, error, mutate, tableKey, isLoading } = useSpotlights();
  const dataWithImages = data
    ? {
        rows: data.rows.map((row) => ({
          ...row,
          images: (
            <div className="flex flex-wrap gap-md overflow-x-auto">
              {row.images.map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  alt="Spotlight Image"
                  className="h-[100px] w-auto object-contain"
                  width={100}
                  height={100}
                />
              ))}
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
        await fetch(`/api/spotlights/${id}`, {
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
        await fetch(`/api/spotlights/${sourceId}`, {
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
      data={dataWithImages}
      error={error}
      draggable
      isLoading={isLoading}
      reorderCallback={onReorder}
      onClickDelete={onClickDelete}
    />
  );
};
