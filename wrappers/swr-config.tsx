import { SWRConfig } from 'swr';

interface SWRConfigProviderProps {
  children: React.ReactNode;
}

// Custom error class to handle fetch errors
class FetchError extends Error {
  info: any;
  status: number;

  constructor(message: string, status?: number, info?: any) {
    super(message);
    this.info = info;
    this.status = status ?? 500;
    // Set the prototype explicitly to allow instanceof checks
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}

// From the SWR docs
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const SWRConfigProvider: React.FC<SWRConfigProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
