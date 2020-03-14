import React from 'react';
import './App.css'

import Showcase from './Showcase'
import Author from './Author'

const AUTHORS = Array.from({length: 10}).map((_, index) =>({
	id: `author-${index}`,
	name: 'Un Autor',
	pic: 'http://placehold.it/128x128'
}));

function App() {
  return (
	<Showcase keyfn={item => item.id} items={AUTHORS} render={author =>
		<Author details={author}/>
			
	} />
  );
}

export default App
