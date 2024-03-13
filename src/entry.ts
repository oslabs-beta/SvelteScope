import './app.css';
import App from './routes/+layout.svelte';

export default new App({
  target: document.getElementById('app')!,
});