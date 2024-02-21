const express = require("express");
const router = express.Router();
const Pokemon = require("../models/Pokemon");

router.get("/", async (req, res) => {
  try {
    /**Le ponemos aarayPokemonDB para
     * diferenciar los datos que vienen de la base de datos
     * con respecto al arrayPokemon que tenemos EN LA VISTA */
    const arrayPokemonDB = await Pokemon.find();
    console.log(arrayPokemonDB);
    res.render("pokemon", {
      arrayPokemon: arrayPokemonDB,
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  /**Con esta constante se recupera todo lo que viene del
   * body, es decir edel formulario y sus atributos, tales como el name.
   */
  const body = req.body;
  /**Para comprobar por pantalla */
  console.log(body);
  try {
    /** Con esta constante lo que hacemos es crear un nuevo Objeto Pokemon gracias al modelo */
    const pokemonDB = new Pokemon(body);
    /**Loguardamos con el metodo save, gracias a Mongoose */
    await pokemonDB.save();
    /**Nos redirecciona a la vista del listado ya actualizada */
    res.redirect("/Pokemon");
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  /**El id lo recojemos por el metodo GET (RUTAS) */
  /**Constante que iguala al id del pokemon
   * segun la vista Pokemon.ejs y a su campo pokemon.id, con lo
   * cual la llamamos con params.id*/
  const id = req.params.id;
  try {
    /**_id porque así lo indíca Mongo
     * La variable pokemonDB está definida con el require
     * Usammos Mongoose para buscar un único documento que coincide con el id indicado*/
    const pokemonDB = await Pokemon.findOne({ _id: id });
    console.log(pokemonDB); /**para probar por consola */
    res.render("detalle", {
      /**Mostramos el obejto en la vista detalle */ pokemon: pokemonDB,
      error: false,
    });
  } catch (error) {
    /**Para la excepción si el id indicado no se encuentra */
    console.log("Se ha producido un erro", error);
    res.render("detalle", {
      error: true,
      message: "Pokémon no encontrado!",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("_id desde backend", id);
  try {
    const pokemonDB = await Pokemon.findByIdAndDelete({ _id: id });
    console.log(pokemonDB);
    if (!pokemonDB) {
      res.json({
        estado: false,
        message: "No se puede eliminar el Pokémon.",
      });
    } else {
      res.json({
        estado: true,
        message: "Pokémon eliminado.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id);
  console.log('body', body);
  try {
    const pokemonDB = await Pokemon.findByIdAndUpdate(
      id, body, {useFindAndModify: false}
    )
    console.log(pokemonDB)
    res.json({
      estado: true,
      message: 'Pokémon editado'
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      message: 'Problema al editar el Pokémon'
    });
  }
});

module.exports = router;
