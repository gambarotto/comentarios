//Configuração do adapter p/ testes
//Esse arq. é chamado sempre antes q um test seja executado 
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
Enzyme.configure({adapter: new Adapter() })
