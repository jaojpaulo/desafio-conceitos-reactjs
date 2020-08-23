import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);
  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `desafio-conceitos-nodejs ${Date.now()}`,
      url: "https://github.com/jaojpaulo/desafio-conceitos-nodejs",
      techs: ["Javascrip", "HTML"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);

    api.delete(`/repositories/${id}`).then(response => {

      const repositoryIndex = repositories.findIndex(repository => repository.id === id);

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);

    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
