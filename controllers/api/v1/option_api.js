// ------ Importing models ------ //

const Question = require('../../../models/Question');
const Option = require('../../../models/Option');


/*
 Route:          /option/id/addVote
 Description:    increment the count of votes
 Method:         POST
 */

 // http://localhost:5000/api/v1/option/:id/addVote
module.exports.addVote = async (req, res) => {

    try {

        let id = req.params.id;

 // ------ checking if option exists then add a new vote ------ //
        await Option.findByIdAndUpdate(id, { $inc: { votes: 1 } });

        return res.status(200).json({

            message: "Voted Successfully"

        });

    } catch (err) {

        console.log('Error In Adding Vote', err);

        return res.status(500).json({
            message: "Internal Server Error In Adding Vote"
        });
    }

}


/*
 Route:          /option/id/delete
 Description:    delete an Option
 Method:         DELETE
 */


// http://localhost:5000/api/v1/option/:id/delete
module.exports.deleteOption = async (req, res) =>{

     try {

        let id = req.params.id;

     // ----- Checking if option exists ----- //
        let option = await Option.findById(id);

        if (option.votes > 0) {

            return res.status(400).json({

                message: "Option cannot be deleted"

            });
        }

        // ----- deleting option from question ----- //
        await Question.findByIdAndUpdate(option.question, { $pull: { option: id } });

      // ----- deleting the option  ----- //
        await Option.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Option Deleted Successfully"
        });

    } catch (err) {

        console.log('Error in deleting Option', err);

        return res.status(500).json({
            message: "Internal Server Error in deleting Option!"
        });
    }
    
}