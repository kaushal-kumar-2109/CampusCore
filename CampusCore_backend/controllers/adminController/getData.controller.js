const getStudents = async (req,res) => {
    res.status(200).json({message:"Get students data"});
}

module.exports = {getStudents};