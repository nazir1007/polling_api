// ----- importing models ----- //
const Question = require('../../../models/Question');
const Option = require('../../../models/Option');

/*
 Route:          /question/create
 Description:    Create a question
 Method:         POST
 */

// http://localhost:5000/api/v1/question/create
module.exports.createQuestion = async (req, res) => {

    try {
        let question = await Question.create(req.body);
      
 // ----- if question is created then return json response ------ //
        if(question){
            return res.status(200).json({
                questionCreated : question,
                message: "Question created Successsfully"
            });
        } else{
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }
    } catch(err){
        console.log('Error while creating a question', err);
        return res.status(500).json({
            message: "Internal Server error in creating a question"
        })
    }
    
}

/*
 Route:          /question/id/option/create
 Description:    Add option to a question
 Method:         POST
 */


// http://localhost:5000/api/v1/question/id/option/create
module.exports.createOption = async(req, res) => {

    try{

         // ------ Checking Question exists or not ------ //
        let question = await Question.findById(req.params.id);

        if(question){

         // ----- creating an option ----- //
            const id = question.options.length + 1;

            let option = await Option.create({

                id: id,
                question: req.params.id,
                text: req.body.text,
                votes: 0,
            })
         // ----- Link for vote ----- //
            option.link_to_vote = "http://localhost:5000/api/v1/option/" + option._id + "/addVote";

            option.save();

            question.options.push(option);
            question.save();

            return res.status(200).json({
                option,
                message: "Option Created Successfully"
            })
        }

        return res.json({
            question
        })

    } catch(err){
        console.log("Error while creating Option", err);
        return res.status(500).json({
            message: "Internal Server Error while Crating an Option"

        })
    }
    
}

/*
 Route:          /question
 Description:    View a question and it's Options
 Method:         GET
 */

 // http://localhost:5000/api/v1/question/id
module.exports.viewQuestion = async (req, res) => {

    try {

        let showQuestion = await Question.findById(req.params.id).populate('options');
        
        if(showQuestion) {

            return res.status(200).json({
                questionShowed: showQuestion,
                message: "Question displayed successfully"
            })
        }

    } catch (err) {
        
        console.log("Error while Viewing QUestion", err);
        return res.status(500).json({
            message: "Internal server Error while veiwing Question"
        })
        
    }
    
}


/*
 Route:          /question/id/delete
 Description:    Delete a question
 Method:         DELETE
 */

// http://localhost:5000/api/v1/question/id/delete
module.exports.deleteQuestion = async(req, res) => {

    try{

        let id = req.params.id;

        let question = await Question.findById(id).populate({
            path: 'options',
            select: 'votes',
        });

        if(question) {

     // ----- checking if any option has votes already ------ //
            let options = question.options;

            for(let i = 0; i < options.length; i++){
                if(options[i].votes > 0) {

                    return res.status(404).json({
                        message: "Question can not be deleted, it's options are voted already "
                    })
                }
            }

     //----- if no votes on any option of question ------ //
            await Option.deleteMany({ question: id });
            await Question.findByIdAndDelete(id);

            return res.status(404).json({
                message: "Question deleted Successfully"
            })
        }

    } catch(err){
        console.log('Error while Deleting a question', err);
        return res.status(500).json({
            message: "Internal Server Error in Deleting Question"
        })

    }
    
}