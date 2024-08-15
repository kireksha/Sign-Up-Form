import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<SignUpForm />
	</React.StrictMode>,
);
