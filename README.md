## Pet Project

### App para controle de gastos e medicamentos de pets.

### Hooks

<img src="https://user-images.githubusercontent.com/50894850/175794455-180e319e-f2cb-4c7f-8584-2d198c966127.png">

### Contexts

<img src="https://user-images.githubusercontent.com/50894850/175794439-f356ea36-dd7c-4c9b-837b-0716e5d05959.png">
Auth.tsx - Arquivo que contém as propriedades e funções de Login, Criação de Usuário e LogOut do app.


index.tsx - Arquivo que hospeda e exporta os outros arquivos da pasta Contexts, para facilitar a importação 

Medicine.tsx - Passa as funções da página de medicamentos - Criação de um medicamento/Listagem dos Medicamentos/Remoção de um Medicamento

Payments.tsx - Passa as funções da página de pagamentos - Criação do Pagamento/Listagem do Pagamento/Remoção do Pagamento

Pet.tsx - Passa as funções da página de pets - Criação de um novo pet/Listagem dos pets cadastrados/Exclusão de um Pet

### Fluxo do App

1- Tela Home com os botões que levam para as telas de Login e Cadastro

2- Tela de Cadastro de Usuário

3- Tela de Login

<img src="https://user-images.githubusercontent.com/50894850/175793713-45280c72-c184-4478-b1e2-37479f91767a.png">

Tela de Cadastro de um novo pet e listagem dos mesmos

<img src="https://user-images.githubusercontent.com/50894850/175793853-e0f62633-d42d-4caf-bf90-7e23a6732164.png">

Tela de Cadastro de um novo gasto para o pet selecionado

<img src="https://user-images.githubusercontent.com/50894850/175793919-905e8477-53e8-4219-b8a0-8811cda9fea9.png">

Tela de Cadastro de um novo medicamento para o pet selecionado

<img src="https://user-images.githubusercontent.com/50894850/175794014-c1897205-0f07-4cdb-9b63-7338f8505d31.png">


### Run

#expo-cli global instalado - $ npm i -g expo-cli

$ git clone https://github.com/GusttavoLopes/ps-projeto-pet.git

$ cd pet

$ yarn install

$ expo install ou npm install

$ npm start (yarn web ou npm run web)

porta:19006 - http://localhost:19006/

&#xa0;

<a href="#top">Back to top</a>
