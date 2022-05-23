import app from './src/app';
import dbConnection  from './src/db/database';

async function main(){
    await dbConnection()
    app.listen(app.get('port'), () => {
        console.log(`server on port`, app.get('port'))
    })
}

main();