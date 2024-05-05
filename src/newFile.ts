import rotasAuxiliares from './routes/rotasAuxiliares';
import { app } from './app';

app.use('/aux', rotasAuxiliares);
