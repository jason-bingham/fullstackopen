import { useState } from "react";

const Person = ({ name, phone }) => (
  <tr>
    <td>{name}</td>
    <td>{phone}</td>
  </tr>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNewFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const nameVerification = () => {
    if (persons.some((person) => person.name === newName.trim())) {
      alert(`${newName} is already in the phonebook.`);
    } else if (newName.trim() === "") {
      alert("Blank entries are not accepted.");
    } else {
      return true;
    }
  };

  const phoneVerification = () => {
    if (newPhone.trim() === "") {
      alert("Blank entries are not accepted.");
    } else if (!/^\d+(-\d+)*$/.test(newPhone.trim())) {
      alert(
        "Phone number can only contain digits and hyphens (e.g. 123-456-7890).",
      );
    } else if (
      persons.some(
        (person) =>
          person.phone.replace(/-/g, "") === newPhone.trim().replace(/-/g, ""),
      )
    ) {
      alert(`${newPhone} is already in the phonebook.`);
    } else if (newPhone.trim().replace(/-/g, "").length != 10) {
      alert(`phone number should include 10 digits.`);
    } else {
      return true;
    }
  };

  const newSubmission = (event) => {
    event.preventDefault();
    if (nameVerification() && phoneVerification()) {
      setPersons([
        ...persons,
        { name: newName.trim(), phone: newPhone.trim() },
      ]);
      setNewName("");
      setNewPhone("");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="name">Filter shown with: </label>
        <input
          id="filter"
          name="filter"
          value={newFilter}
          onChange={handleNewFilterChange}
        />
      </div>
      <h2>Add new entry:</h2>
      <form>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            autoComplete="on"
            placeholder="John Doe"
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            id="phone"
            name="phone"
            autoComplete="on"
            placeholder="(123) 456-7890"
            value={newPhone}
            onChange={handleNewPhoneChange}
          />
        </div>
        <div>
          <button onClick={newSubmission} type="submit">
            add
          </button>
        </div>
      </form>
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => {
            if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
              return (
                <Person
                  key={person.name}
                  name={person.name}
                  phone={person.phone}
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
