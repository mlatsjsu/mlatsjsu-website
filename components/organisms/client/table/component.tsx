import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import React from 'react';

type ItemWithID = {
  id: string;
} & Record<string, any>;

interface Props {
  draggable?: boolean;
  data?: { rows: ItemWithID[] } | null;
  isLoading: boolean;
  error: Error | null;
  reorderCallback?: (ids: [string | null, string, string | null]) => void;
  onClickDelete: (id: string) => void;
}

export const Table: React.FC<Props> = ({
  draggable = false,
  data,
  isLoading,
  error,
  reorderCallback = () => {},
  onClickDelete,
}) => {
  const [currentRow, setCurrentRow] = React.useState<Element | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLTableRowElement>) => {
    if (
      !(e.target instanceof Element) ||
      !e.target.parentNode ||
      e.target.nodeName !== 'TR'
    )
      return;
    setCurrentRow(e.target);
  };

  const onDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    if (
      !(e.target instanceof Element) ||
      !e.target.parentNode ||
      !e.target.parentNode.parentNode ||
      !(e.target.parentNode instanceof Element) ||
      !currentRow ||
      e.target.nodeName !== 'TD'
    )
      return;
    const children = Array.from(e.target.parentNode.parentNode.children);
    if (children.indexOf(e.target.parentNode) > children.indexOf(currentRow)) {
      e.target.parentNode.after(currentRow);
    } else {
      e.target.parentNode.before(currentRow);
    }
  };

  const onDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    if (
      !(e.target instanceof Element) ||
      !e.target.parentNode ||
      e.target.nodeName !== 'TR'
    )
      return;
    const children = Array.from(e.target.parentNode.children);

    const x = children.indexOf(e.target);
    const y = x - 1;
    const z = x + 1;

    const xId = children[x].id;
    const yId = children[y]?.id;
    const zId = children[z]?.id;

    const affectedIds = [yId ?? null, xId, zId ?? null];
    reorderCallback(affectedIds as [string | null, string, string | null]);
  };

  return (
    <div className="w-full select-none overflow-x-auto rounded-sm border-[1px] border-light-neutral-gray">
      {data?.rows.length ? (
        <table className="w-full text-left text-small-lg rtl:text-right">
          <thead className="bg-[rgb(var(--color-light-neutral-gray)/0.25)] text-light-neutral-dark">
            <tr className="border-b-[1px] border-light-neutral-gray">
              {Object.keys(data.rows[0])
                .filter((key) => key !== 'id')
                .map((key) => (
                  <th key={key} className="px-md pb-sm pt-md font-medium">
                    {key}
                  </th>
                ))}
              <th className="px-md pb-sm pt-md" />
              {draggable ? <th className="px-md pb-sm pt-md" /> : null}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={i}
                id={row.id}
                className="border-b-[1px] border-light-neutral-gray bg-light-background last:border-b-[0px]"
                draggable={draggable}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
              >
                {Object.entries(row)
                  .filter(([key, _value]) => key !== 'id')
                  .map(([key, value]) => (
                    <td key={key} id={key} className="px-md py-sm">
                      {value}
                    </td>
                  ))}
                <td className="w-lg px-md py-sm text-light-neutral-dark">
                  <button
                    aria-label="delete"
                    onClick={() => onClickDelete(row.id)}
                    className="flex h-full items-center transition-all duration-100 ease-in-out hover:opacity-75"
                  >
                    <XMarkIcon width={16} height={16} />
                  </button>
                </td>
                {draggable ? (
                  <td className="w-lg px-md py-sm text-light-neutral-dark">
                    <button
                      aria-label="drag"
                      className="flex h-full cursor-grab items-center transition-all duration-100 ease-in-out hover:opacity-75 active:cursor-grabbing"
                    >
                      <Bars3Icon width={16} height={16} />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="w-full p-md text-center">
          <em>
            {isLoading ? 'Loading...' : error ? error.message : 'No data.'}
          </em>
        </p>
      )}
    </div>
  );
};

export default Table;
