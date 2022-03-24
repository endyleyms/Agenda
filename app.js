const express= require ('express')
const morgan = require('morgan')

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

const app = express ();
app.use(morgan(':method :url :body'))
morgan.token('type', function (req, res) { return req.body })

app.use(express.json())

const persons=[
    {
        id:1,
        name: "Ferney Medina",
        number: "3242353353"
    },
    {
        id:2,
        name: "Jose Medina",
        number: "324235343"
    },
    {
        id:3,
        name: "Wendy Medina",
        number: "31256777"
    },
    {
        id:4,
        name: "Fabian Perez",
        number: "3475435343"
    },
    
    
]
const port = process.env.PORT || 8080

//Punto 1
app.get("/api/persons", (req, res) =>{
    res.json(persons);
})

//Punto 2
app.get("/info", (req, res)=>{
    const date = new Date().toString()
    const info = `<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>` 
    res.send(info)
})

//Punto 3
app.get("/api/persons/:id", (req, res)=>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }   
    
})

//Punto 4
app.delete("/api/persons/:id", (req, res)=>{
    const id= Number(req.params.id)
    persons= persons.filter(person => person.id !== id)
    res.status(204).end()
     
})

//Punto 5 y 6
const newId= () =>{
    const randomId= (Math.random()*1000000)+1
    return randomId;
}

app.post("/api/persons", (req, res) =>{
    const body = req.body
    if (!body.name ||!body.number ) {
        return res.status(400).json({ 
          error: 'Be sure you are sending name and number' 
        })
    }
    const newPerson= {
        id: newId(),
        name: body.name,
        number: body.number
    }
    
    const validated =persons.find(person=>person.name===newPerson.name)
    if (validated === undefined && newPerson.name !=="" && newPerson.number !=="" ){
        persons.push(newPerson)
        res.json(newPerson)
    }else if(newPerson.name==""){
        res.status(404).json({error:'name doesnt exist'})
      }else if(newPerson.number==""){
        res.status(404).json({error:'number name doesnt exist'})
      }else if(validated!==undefined){
        res.status(404).json({error:'name must be unique'})
      }
    }
    
)

//Punto 7



app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})