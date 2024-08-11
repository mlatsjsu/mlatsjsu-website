import { SWRConfig } from 'swr';

interface SWRConfigProviderProps {
  children: React.ReactNode;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
