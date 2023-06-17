const { Router } = require('express');
const axios = require("axios")
const {Dog, Character} = require("../../src/db.js")
const router = Router();

function co(arr){
    var ss = arr.map((i)=> i?.split(", "))
   const e = ss.reduce((i, e)=> [i+"," + e])
   return e[0].split(",")
  }
  function se(arr){
    let ar = []
    let i = 0
    for(var j = 0; j < arr.length-1; j++){
        if(ar.filter((i)=> i === arr[j]).length === 0){
          ar.push(arr[j])
      }
    }
    return ar
  }
  function dolo(str){
    if(str=== undefined){
    return str
    } else {
      return str.split(",")
    }
  }

  function joins(name, names){
    const name1 = name.toLowerCase()
    const name2 = names.toLowerCase()
    let co = []
    for(var i = 0; i < name.length; i++){
      co.push(name2[i])
    }
    let cc = co.join("")
    if(name1 == cc){
      return names
    } else {
      return "no se encontro"
    }
  }

router.get("/dogs",async (req, res)=>{
    try {
        const {name} = req.query
        if(name){
            const zo = []
            const resp = await axios.get("https://api.thedogapi.com/v1/breeds")
            .then((r)=> r.data)
            .catch(error=> console.log(error))
            const repe = await Dog.findAll({
                include: Character,
            })
            const sss = repe.map((i)=> de={
                id: i.id,
                peso: i.peso,
                altura: i.altura,
                name: joins(name, i.name),
                añosDeVida: i.añosDeVida,
                image: i.image,
                characters: i.characters.map((j)=> j.name)
            })
            const tr = resp?.map((i)=> us={
                id: i.id,
                peso: i.weight.metric,
                altura: i.height.metric,
                image: i.image?.url,
                name: joins(name, i.name),
                añosDeVida: i.life_span,
                characters: dolo(i.temperament)
            })
            const filds = tr.filter(e=> e.name !== "no se encontro");
            const fild = sss.filter(e=> e.name !== "no se encontro");
            if(fild.length > 0){
                for(var i = 0; i < fild.length; i++){
                    zo.push(fild[i])
                }
            }
            if(filds.length > 0){
                for(var i = 0; i < filds.length; i++){
                    zo.push(filds[i])
                }
            } 
            if(zo.length < 1){
                zo[0] = {message:"no se encontro ninguna raza por ese nombre", sot: true}
            }
            return res.status(200).send({resp: zo})
        }
        const info = await Dog.findAll({
            include: Character,
        })
        const resp = await axios.get("https://api.thedogapi.com/v1/breeds")
        .then((r)=> r.data)
        .catch(error=> console.log(error))
        const dd = resp.map((i)=> rep={
            id: i.id,
            peso: i.weight.metric,
            altura: i.height.metric,
            image: i.image.url,
            name: i.name,
            añosDeVida: i.life_span,
            characters: i.temperament
        })
        if(info.length > 0){
            const sss = info.map((i)=> de={
                id: i.id,
                peso: i.peso,
                altura: i.altura,
                name: i.name,
                añosDeVida: i.añosDeVida,
                image: i.image,
                characters: i.characters.map((j)=> j.name)
            })
            for(var i = 0; i < info.length; i++){
                dd.push(sss[i])
            }
        }
        return res.status(200).send({resp: dd})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/dogs/:idRaza",async (req, res)=>{
    try {
        const {idRaza} = req.params
        if(idRaza){
        const resp = await axios.get("https://api.thedogapi.com/v1/breeds")
        .then((r)=> r.data)
        .catch(error=> console.log(error))
        const rep = await Dog.findAll({
            where: {id: idRaza}, 
            include: Character,
        })
        const rest = resp.filter((i)=> i.id == idRaza)
        if(rest.length > 0){
            const dd = rest.map((i)=> use={
                id: i.id,
                peso: i.weight.metric,
                altura: i.height.metric,
                image: i.image.url,
                name: i.name,
                añosDeVida: i.life_span,
                characters: dolo(i.temperament)
            })
            res.status(200).send(dd)
        } else if(rep.length > 0) {
            const sss = rep.map((i)=> de={
                id: i.id,
                peso: i.peso,
                altura: i.altura,
                name: i.name,
                añosDeVida: i.añosDeVida,
                image: i.image,
                characters: i.characters.map((j)=> j.name)
            })
            res.status(200).send(sss)    
        } else {
            res.status(200).send({message: "no se encontro"})
        }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/dogs",async (req, res)=>{
    try {
        const image = "no tiene imagen"
        const { name, altura, peso, añosDeVida, temperament} = req.body
        if(name && peso && altura && añosDeVida){
            const ss = temperament.map((i)=> user= {
                name: i
            })
            const resp = await Dog.findAll()
            const fil = resp.filter((i)=> i.name === name)
            if(fil.length > 0){
                return res.status(200).send({message: "ya hay una raza con ese nombre"})
            } else {
                const users = await Dog.create({ id: name, name, altura, peso, añosDeVida, image})
                const us = await Character.bulkCreate(ss)
                const dd = us.map((i)=> i.id)
                await users.addCharacter(dd)
                return res.status(200).send({message: "creado con exito"})
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/temperamentos",async (req, res)=>{
    try {
        const oo = await axios.get("https://api.thedogapi.com/v1/breeds")
        .then((r)=> r.data)
        .catch(error=> console.log(error))
        const ss = oo.map((i)=> i.temperament)
        const d = co(ss)
        const er = se(d)
        res.status(200).send(er)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/dogss",async (req, res)=>{
    try {
        const {str} = req.query
        if(str === "api"){
            const resp = await axios.get("https://api.thedogapi.com/v1/breeds")
            .then((r)=> r.data)
            .catch(error=> console.log(error))
            const dd = resp.map((i)=> use={
                id: i.id,
                peso: i.weight.metric,
                altura: i.height.metric,
                image: i.image.url,
                name: i.name,
                añosDeVida: i.life_span,
                characters: dolo(i.temperament)
            })
            res.status(200).send(dd)
        } else {
            const resp = await Dog.findAll({include: Character,})
            const sss = resp.map((i)=> de={
                id: i.id,
                peso: i.peso,
                altura: i.altura,
                name: i.name,
                añosDeVida: i.añosDeVida,
                image: i.image,
                characters: i.characters.map((j)=> j.name)
            })
            res.status(200).send(sss)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;