import pool from '../configs/connectDB';
let getAllUsers = async(req,res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `user`');
    return res.status(200).json({
        message:'ok',
        data:rows
    })
}

let creatUser = async(req,res) =>{

    let { firsName, lastName, email , address} = req.body;

        if(!firsName || !lastName || !email || !address)
        {
            return res.status(200).json({
                message:'mising required params'
            })
        }
    await pool.execute('insert into user(firsName,lastName,email,address) values (?,?,?,?)',
    [firsName,lastName,email,address]);

    return res.status(200).json({
        message:"ok"
    })
}

let updateUser = async(req,res) =>{

    let { firsName, lastName, email , address,id} = req.body;

    if(!firsName || !lastName || !email || !address ||!id)
    {
        return res.status(200).json({
            message:'mising required params'
        })
    }
    await pool.execute('update user set firsName =?, lastName=?,email=?,address=? where  id =?',
    [firsName, lastName, email , address,id]);
    return res.status(200).json({
        message:"ok"
    })
}


let deleteUser = async(req,res) =>{

    let userId = req.params.userId;
    if(!userId)
    {
        return res.status(200).json({
            message:'mising required params'
        })
    }
    await pool.execute('DELETE FROM user where id = ?',[userId]);
    return res.status(200).json({
        message:"ok"
    })

}
module.exports = {
    getAllUsers,creatUser,updateUser,deleteUser
}