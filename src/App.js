import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {setRepositories(response.data)});
  });


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Teste adicionar React ${Date.now()}`,
      url: "https://github.com/joeltonluz",
      techs: ["Nodejs","React Native"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(r => (
        <li key={r.id}> 
          <span>
            <h3>{r.title}</h3>
            <p><a href={r.url}>{r.url}</a></p>
          </span>
          <button onClick={() => handleRemoveRepository(r.id)}> Remover </button>
        </li>))}
      </ul>

      <button className="adicionar" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
