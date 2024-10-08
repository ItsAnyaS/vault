const express = require("express");
const cors = require("cors");
const crypto = require('crypto');
const { sequlize } = require('./models') 
const app = express();
const { Vault } = require('./models')

const secretKey = 'secret-key'


app.use(cors({

}))
app.use(express.json());


app.get('/vault', async(req, res)=> {
try {
    let vault = await Vault.findOne({name: 'Anastasia'})
    return res.json({
        name: vault.name,
        content: vault.content
    });
} catch (error) {
    console.log(error)
    return res.json(error)
}

})


app.post("/openVault", async(req,res)=> {
    let { encryptedPasscode } = req.body;
    try {
        let user = await Vault.findOne({name: 'Anastasia'})
        const secretKey = '1234567812345678'; 
        const iv = '1234567812345678'; 

        const { passcode: encryptedPasscode } = req.body;
        const decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, iv);

        let decrypted = decipher.update(encryptedPasscode, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        if (user.passcode == decrypted){
            setTimeout(()=> {
                return res.json({
                    status: "Accepted",
                    content: user.content})},
            1000)
            
        }else{
            return res.json({status: "Declined"})
        }
    } catch (error) {
        console.log(error)
        return res.json({status: "Unable to reach server"})
    }
})

app.put("/updateContent", async(req,res) => {
    try {
        let {editedContent} = req.body
    let user = await Vault.findOne({name: 'Anastasia'})
        await user.update({content: editedContent})
        await user.save()
    return res.json({message: "Text updated"})
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})


app.delete('/deleteContent', async(req, res) => {
    try {
        let user = await Vault.findOne({name: 'Anastasia'})
        await user.update({content: ''})
        await user.save()
        return res.json({message: "Content Deleted"})
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})






app.listen(4040, ()=> {
    console.log("Server is running");
});








