# Cycle Trainning

☪️ Seja bem vindo(a)! Esse é o projeto de conclusão de curso, elaborado no Bootcamp de **Desenvolvimento Web Back-End da {reprograma}**, em **JavaScript.** O Cycle Trainning é uma API que tem como objetivo **maximizar o treino de pessoas que menstruam**, levando em consideração as mudanças hormonais que ocorrem ao longo do ciclo, indicando o treino mais adequado para cada momento!

## Sobre a aplicação

As mulheres que, assim como eu, são apaixonadas por exercício físico sem dúvida já notaram que o rendimento pode variar muito ao longo do mês. Em alguns momentos aquela carga já conquistada parece muito mais árdua, ou o nosso tempo de corrida não condiz com a capacidade real. 😡

Saber que isso tem uma justificativa biológica é um enorme alívio, e diminui a pressão de performance em alguns dias. Essa variação de rendimento se dá pelas intensas mudanças hormonais que as mulheres passam, e cada um dos momentos do ciclo podem ser combinados com um tipo certo de exercício!

Com base nisso, essa API reúne diferentes tipos de exercício (`charts`), catalogados como: `stenght` `stretching` e `cardio`

- Cycle Trainning é divido em três etapas:
    
    👤 Sistema de manipulação de usuárias;
    
    💪🏾 Sistema de manipulação de treinos;
    
    🌙 Cycle analysys.
    

Continue a leitura para saber mais!

---

## Arquitetura e escolhas da projetista

- Este projeto foi elaborado seguindo a organização da arquitetura MVC (Model, View e Controller):

```jsx
\--📂 cycletrainning
|
|    .env.example   
|    .gitignore    
|    package-lock.json
|    package.json
|    Procfile
|    [README.md](http://readme.md/)
|    server.js
|
\--📂src
     |
     |   app.js
     |
     📂---controllers
****     |
     |   chartsController.js
     |   cycleController.js
     |   userController.js
     |
     📂---database
     |
     |   mongoDBConfig.js
     |
     📂---middlewares
     |
     |   auth.js
     |
     📂---models
     |
     |   chartsSchema.js
     |   userSchema.js
     |
     |-----📂routes
     |
     |   chartsRoutes.js
     |   cycleRoutes.js
     |   userRoutes.js
```

- O CT foi desenvolvido inteiramente em inglês, incluindo as mensagens destinadas ao Front-End.

---

- Descrição das pastas:
    - [.env.example](https://github.com/camilamata/cycleTraining/blob/main/.env.example)  mostra como ficam as variáveis no arquivo .env
    - [.gitignore](https://github.com/camilamata/cycleTraining/blob/main/.gitignore) descreve quais arquivos devem ser ignorados ao commitar o repositório
    - [package-lock.json](https://github.com/camilamata/cycleTraining/blob/main/package-lock.json) mostra as dependências do projeto e suas respectivas versões
    - [Procfile](https://github.com/camilamata/cycleTraining/blob/main/Procfile) configura o deploy no Heroku
    - [server.js](https://github.com/camilamata/cycleTraining/blob/main/server.js) configura o servidor
    
- O conteúdo da pasta `src` está dividido entre as três camadas do projeto:

## 💪🏾  1- Charts

- Esta etapa fornece opções de manipulação dos exercícios cadastrados no banco de dados, e suas funções são comandadas pelas pastas:
    - 📂 [chartsController.js](https://github.com/camilamata/cycleTraining/blob/main/src/controllers/chartsController.js)
    - 📂 [chartsRoutes.js](https://github.com/camilamata/cycleTraining/blob/main/src/routes/chartsRoutes.js)
    - 📂 [chartsSchema.js](https://github.com/camilamata/cycleTraining/blob/main/src/models/chartsSchema.js)
- Todas os exercícios cadastrados devem seguir o modelo previsto na chartsSchema, e aqui está um exemplo de dois charts cadastrados:

```jsx
"_id": "62da016d8e1f4b376176fa6f",
            "name": "Side Neck Stretch",
            "force": "static",
            "level": "beginner",
            "mechanic": "isolation",
            "equipment": "body only",
            "primaryMuscles": [
                "neck"
            ],
            "instructions": [
                "Start with your shoulders relaxed, gently tilt your head towards your shoulder.",
                "Assist stretch with a gentle pull on the side of the head."
            ],
            "type": "stretching",
            "category": "pms",
            "__v": 0
        },
        {
            "_id": "62da01fc8e1f4b376176fa75",
            "name": "World's Greatest Stretch",
            "force": "static",
            "level": "intermediate",
            "mechanic": "isolation",
            "equipment": "body only",
            "primaryMuscles": [
                "hamstrings"
            ],
            "instructions": [
                "This is a three-part stretch. Begin by lunging forward, with your front foot flat on the ground and on the toes of your back foot. With your knees bent, squat down until your knee is almost touching the ground. Keep your torso erect, and hold this position for 10-20 seconds.",
                "Now, place the arm on the same side as your front leg on the ground, with the elbow next to the foot. Your other hand should be placed on the ground, parallel to your lead leg, to help support you during this portion of the stretch.",
                "After 10-20 seconds, place your hands on either side of your front foot. Raise the toes of the front foot off of the ground, and straighten your leg. You may need to reposition your rear leg to do so. Hold for 10-20 seconds, and then repeat the entire sequence for the other side."
            ],
            "type": "stretching",
            "category": "pms",
            "__v": 0
        }
```

- As funcionalidades desta etapa e suas respectivas rotas são:

|  | Rota | Funcionalidade |
| --- | --- | --- |
| GET | /searchChart | acessa um exercício pelo seu nome |
| POST | /registerChart | cadastra um novo treino |
| DELETE | /deleteChart/:id | deleta um exercício pelo seu ID |
| PUT | /updateChart/:id | atualiza as informações de um exercício |

---

## 👤 2- Users

- Esta etapa consiste nas funções básicas de usuário, comandadas pelas pastas:
    - 📂 [userController.js](https://github.com/camilamata/cycleTraining/blob/main/src/controllers/userController.js)
    - 📂 [userRoutes.js](https://github.com/camilamata/cycleTraining/blob/main/src/routes/userRoutes.js)
    - 📂[userSchema.js](https://github.com/camilamata/cycleTraining/blob/main/src/models/userSchema.js)

- Todas as usuárias cadastradas devem seguir o modelo previsto na userSchema:

```jsx
const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    workoutPreference: {
        type: String,
        required: true
    }
       });
```

- As funcionalidades desta etapa e suas respectivas rotas são:

|  | Rota | Funcionalidade |
| --- | --- | --- |
| GET | /accessUser | acessa uma usuária pelo seu nome |
| POST | /registerUser | cadastra uma nova usuária |
| DELETE | /deleteUser/:id | deleta uma usuária pelo seu ID |
| PUT | /updateUser/:id | atualiza alguma informação de usuária  |

---

## 🌙 3- Cycle Analysys

Aqui é onde a magia acontece! Nessa etapa, a usuária insere **a data do primeiro dia de sua última menstruação**, e a aplicação retorna os exercícios mais adequados para prática naquele dia. Os exercícios cadastrados devem ser previamente catalogados como:

| Menstrual | Com essa TAG estão os treinos que exigem menos força e velocidade, focando em alongamentos que aliviam os males do fluxo como dor nas costas e ombros. Esse é o momento de forcarmos na elasticidade e exercícios low impact. |
| --- | --- |
| Post Menstrual | When you can HIIT it! Aqui estão catalogados os exercícios de cardio intenso como corridas e rotinas de box. Esse é o momento de atingirmos nossos limites de condicionamento |
| Ovulation | Marcados como tal estão os treinos focados em strenght com altas cargas ou movimentos mais complexos exigindo mais repetições. Esse é o momento de focar no desenvolvimento de músculos. |
| PMS | Como essa fase é marcada por muitos sintomas de desconforto, com essa TAG estão os charts focados em desenchaço, alívio de cólicas e low impact. |
- Além de indicar o exercício mais adequado, a aplicação trás também uma breve explicação da escolha de charts, para que seja uma experiência além de tudo, didática para a usuária.
- O cálculo foi feito com base em um ciclo de 28 dias, de acordo com a seguinte linha de raciocínio:
    - Parte retirada de [cycleController.js](https://github.com/camilamata/cycleTraining/blob/main/src/controllers/cycleController.js)

```jsx
if(dateDifference > 4 && dateDifference < 12) {
            const foundCharts = await chartsSchema.find({category:"postMenstrual"})
            res.status(200).json({
                "Since your last period started in": req.body,
                "You are in the follicular stage. That means your levels of the hormones estrogen and progesterone are low.This is when you can HIIT it hard! Get your high intensity interval training, powerlifting, heavy weight lifting, plyometrics, long runs, hot yoga, hill repeats, or other intense exercise modalities in now. Take at least one rest day between hard workouts, and be mindful of signs of overtraining, as some studies suggest you may be more prone to muscle damage from overtraining during this phase. Try these exercises" : foundCharts
            });
            console.log("Post Menstrual")
        }
```

---

## Dependências de projeto:

- Express;
- Cors;
- Dotenv-safe;
- Mongoose;
- Bcrypt;
- Nodemon.