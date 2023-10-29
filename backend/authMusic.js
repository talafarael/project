
const {Song, validate}=require('./model/music')

class authMusic{
    
   async musicCreate(req, res) {
    //  const audio=son.string(req.files)
  //  const { error } = validate(audio  );
	// if (error) res.status(400).send({ message: error.details[0].message });
console.log(req.file)
	// const song = await Song(req.files).save();
	// res.status(201).send({ data: song, message: "Song created successfully" });
     
     }

   
}


module.exports = new authMusic();