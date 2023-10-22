const User = require('./model/schema');
const dcrypt = require('bcryptjs');
const Emailsend = require('./emailsend');
const tempData = require('./cahce');
const emailSender = new Emailsend();
class authlogin {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const check = await User.findOne({ email });
            if (check) {
                return res.status(400).json({
                    message: 'Пользователь с таким именем не существует ',
                });
            }
            const hashpassword = await dcrypt.hash(password, 7);
           const status=false
            tempData.setTempData(
                'registrationData',
                { name, email, hashpassword ,status},
                30 * 60 * 1000
            );
        
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async sendemail(req, res) {
      try {
          const data =tempData.getTempData('registrationData');
        
  
          const status = data.status;
         console.log(status )
          if (!status) {
              const emailUser = data.email;
               
              const text = Math.floor(Math.random() * 1000);
              await emailSender.sendmessage({
                  emailUser: emailUser,
                  num: text.toString(),
              });
  
        //       const newstatus = true;
        //       const name = data.name;
        //       const email = data.email;
        //       const hashPassword = data.hashpassword;
      
        //       tempData.setTempData(
        //           'registrationData',
        //           {
        //               name: name,
        //               email: email,
        //               hashpassword: hashPassword,
        //               status: newstatus,
        //           },
        //           30 * 60 * 1000
        //       );
        //   }
        //   console.log(email)
        //   console.log('Email sent successfully');
        //   res.status(200).json({ message: 'Email sent successfully' });
      }} catch (e) {
          console.error(e);
          res.status(400).json({ message: 'Registration error' });
      }
  }
    async registercheck() {
        const user = new User({
            username: name,
            email: email,
            role: 'user',
            password: haspassword,
        });
        user.save();
    }
}
module.exports = new authlogin();
