
module.exports = {

    getUserID: (req, res, next) => {
        rstore.get(`${req.sessionID}`, (error, session) => {
          if (error) {
              console.log(error);
              res.status(400).send(`Must log in to request profile info\n`);
          } else {
              if (!session) {
                console.log(chalk.bgCyan('session not found'));
                req.sessionFound = false
              } else {
                console.log(chalk.bgCyan('session found'));
                console.log(session);
                //req.uid = session.uid
                req.uid = session.uid;
                req.sessionFound = true;
              }
              next()
          }
          
        })
    },
    requireSession: (req, res, next) => {
        if (req.sessionFound) {
            next();
        } else {
            res.json({error: `Invalid Session`, code: 400});
        }
    }

}
