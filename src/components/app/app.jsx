import { useState } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'John', salary: 500, increase: false, rise: false },
    { id: 2, name: 'Victor', salary: 2500, increase: false, rise: true },
    { id: 3, name: 'Dann', salary: 300, increase: false, rise: false },
  ]);
  //создаем состояние для сохранение данных, которые ввел пользователь в строку поиска сотрудника
  //в компоненте SearchPanel
  const [term, setTerm] = useState('');

  const [filter, setFilter] = useState('all');

  let maxId = 4;

  const addItem = (name, salary) => {
    const newItem = { name, salary, increase: false, rise: false, id: maxId++ };
    setData([...data, newItem]);
  };

  //выносим метод отдельно
  const deleteItem = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const onToggleIncrease = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, increase: !item.increase };
      }
      return item;
    });
    setData(newData);
  };

  const onToggleRise = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, rise: !item.rise };
      }
      return item;
    });
    setData(newData);
  };

  // реализуем метода для поиска передаем в качестве аргументов строку по которой будет производиться поиск
  // и массив данных для фильтрации
  const searchEmployee = (term, items) => {
    //если пользователь ничего не вводит, показываем данные без фильтрации
    if (term.length === 0) {
      return items;
    }
    //ищем подстроку которая будет совпадать с именем пользователя
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  //создаем метод для обновления состояния строки поиска
  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter((item) => item.rise);
      case 'salary':
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  const onFilterSelect  = (filter) =>  {
    setFilter(filter);

  }

  //сколько всего сотрудников
  const employees = data.length;
  //сотрудники, которые получат премию
  const increased = data.filter((item) => item.increase).length;
  // сохраняем данные, которые будут отображены после фильтрации
  const visibleData = filterPost(searchEmployee(term, data), filter);
  return (
    <div className="app">
      <AppInfo employees={employees} increased={increased} />

      <div className="search-panel">
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <AppFilter filter={filter} onFilterSelect={onFilterSelect} />
      </div>

      <EmployeesList
        data={visibleData}
        onDelete={deleteItem}
        onToggleRise={onToggleRise}
        onToggleIncrease={onToggleIncrease}
      />
      <EmployeesAddForm onAdd={addItem} />
    </div>
  );
}

export default App;
