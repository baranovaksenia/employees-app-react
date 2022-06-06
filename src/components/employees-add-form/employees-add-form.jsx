import { useState } from 'react';
import './employees-add-form.css';

const EmployeesAddForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //user can not submit the form if input's field is empty
    if (name.length < 3 || !salary) return;
    onAdd(name, salary);
    setName('');
    setSalary('');
  };

  return (
    <div className="app-add-form">
      <h3>Добавьте нового сотрудника</h3>
      <form className="add-form d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control new-post-label"
          placeholder="Как его зовут?"
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={name}
        />
        <input
          type="number"
          className="form-control new-post-label"
          placeholder="З/П в $?"
          onChange={(e) => setSalary(e.target.value)}
          name="salary"
          value={salary}
        />

        <button type="submit" className="btn btn-outline-light">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default EmployeesAddForm;
