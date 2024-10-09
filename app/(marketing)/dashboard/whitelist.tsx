'use client';

import { Table } from '@/components/organisms';
import { WhitelistItem } from '@/types';
import { PlusIcon } from '@heroicons/react/16/solid';
import useSWRImmutable from 'swr/immutable';

interface WhitelistQuery {
  rows: WhitelistItem[];
}

interface FormElements
  extends HTMLFormControlsCollection,
    Omit<WhitelistItem, 'id'> {}
interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const useWhitelist = () => {
  const { data, error, mutate, isLoading } =
    useSWRImmutable<WhitelistQuery>('/api/whitelist');
  return { data, error, mutate, isLoading };
};

export const WhitelistForm = () => {
  const { data, mutate } = useWhitelist();
  const onSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newData = {
      rows: data
        ? [...data.rows, { id: '0', email: formData.get('email') as string }]
        : [{ id: '0', email: formData.get('email') as string }],
    };

    mutate(
      async () => {
        await fetch('/api/whitelist', {
          method: 'POST',
          body: formData,
        });
        return newData;
      },
      {
        optimisticData: newData,
      },
    );
  };
  return (
    <form
      name="whitelist"
      className="flex w-full flex-col gap-lg pb-md"
      onSubmit={onSubmit}
    >
      <label className="flex flex-1 flex-wrap justify-center gap-md">
        <input
          className="max-w-full flex-1 rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
          required
          name="email"
          placeholder="john.doe@acme.org"
          type="email"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-lg py-sm text-button text-light-primary transition-all duration-100 ease-in-out hover:opacity-75"
        >
          <PlusIcon height={16} width={16} />
        </button>
      </label>
    </form>
  );
};

export const WhitelistTable = () => {
  const { data, error, mutate, isLoading } = useWhitelist();
  const onClickDelete = async (id: string) => {
    const newData = {
      rows: data ? data.rows.filter((row) => row.id !== id) : [],
    };
    mutate(
      async () => {
        await fetch(`/api/whitelist/${id}`, {
          method: 'DELETE',
        });
        return newData;
      },
      {
        optimisticData: newData,
      },
    );
  };
  return (
    <Table
      data={data}
      isLoading={isLoading}
      error={error}
      onClickDelete={onClickDelete}
    />
  );
};
