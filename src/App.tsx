import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Table } from './components/table/table';

const MyApp: FC = () => {
  return (
    <main>
      <h1>Список счётчиков</h1>
      <Table />
    </main>
  );
};

export const App = observer(MyApp);
