from flask import Flask, render_template, request,redirect,session,jsonify,make_response
import requests
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app, resources={r"/result": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/result": {"origins": "*"}})

CORS(app) 
app.secret_key = 'your_secret_key'

options = {"q1": None, "q2": None, "q3": None,"q4": None,"q5": None,"q6": None,"q7": None,"q8": None,"q9": None,"q10": None,"q11": None,"q12": None,"q13": None,"q14": None,"q15": None,"q16": None,"q17": None,"q18": None,"q19": None,"q20": None,"q21": None}
userdetails={"name":None,"rollno":None,"phonono":None,"id":None}
values=[]
numbs={0:'Normal',1:'Severe',2:'Mild',3:'Moderate',4:'Extremely Severe'} 
#final_predict = [[0, 0, 0]]


@app.route("/result", methods=["POST", "GET"])
def questions():
    #x = None
    #y = None
    #z = None

    if request.method == "OPTIONS":
        # Respond to the preflight request
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST"
        return response

    elif request.method == "POST":
        data = request.json
        # options["q3"] = data['selectedoptionselectedoption3']
        print("User details from Frontend:",data)
        
        options["q1"] = data['selectedOptions']['selectedoptionselectedoption1']
        options["q2"] = data['selectedOptions']['selectedoptionselectedoption2']
        options["q3"] = data['selectedOptions']['selectedoptionselectedoption3']
        options["q4"] = data['selectedOptions']['selectedoptionselectedoption4']
        options["q5"] = data['selectedOptions']['selectedoptionselectedoption5']
        options["q6"] = data['selectedOptions']['selectedoptionselectedoption6']
        options["q7"] = data['selectedOptions']['selectedoptionselectedoption7']
        options["q8"] = data['selectedOptions']['selectedoptionselectedoption8']
        options["q9"] = data['selectedOptions']['selectedoptionselectedoption9']
        options["q10"] = data['selectedOptions']['selectedoptionselectedoption10']
        options["q11"] = data['selectedOptions']['selectedoptionselectedoption11']
        options["q12"] = data['selectedOptions']['selectedoptionselectedoption12']
        options["q13"] = data['selectedOptions']['selectedoptionselectedoption13']
        options["q14"] = data['selectedOptions']['selectedoptionselectedoption14']
        options["q15"] = data['selectedOptions']['selectedoptionselectedoption15']
        options["q16"] = data['selectedOptions']['selectedoptionselectedoption16']
        options["q17"] = data['selectedOptions']['selectedoptionselectedoption17']
        options["q18"] = data['selectedOptions']['selectedoptionselectedoption18']
        options["q19"] = data['selectedOptions']['selectedoptionselectedoption19']
        options["q20"] = data['selectedOptions']['selectedoptionselectedoption20']
        options["q21"] = data['selectedOptions']['selectedoptionselectedoption21']
        
        userdetails["name"]=data['userdata']['name']
        userdetails["rollno"]=data['userdata']['rollno']
        userdetails["phoneno"]=data['userdata']['phoneno']
        userdetails["id"]=data['userdata']['id']
        
        

        
        
        # print(userdetails)
        
        print("options are:",options)
        print("userdetails are:",userdetails)
        print("hi")
        print(data)
        
        for i,j in options.items():
            values.append(j)
        print(values)

        import pickle
        with open('your_model.pkl', 'rb') as file:
            loaded_model = pickle.load(file)
        predict_output=loaded_model.predict([values])
        
        print(predict_output)


        # Load the model from the pickle file
        with open('model.pkl', 'rb') as file:
            model = pickle.load(file)
        final_predict=model.predict(predict_output)
        print(final_predict)
        values.clear()


        
        print("you have",numbs[final_predict[0][0]],"depression")
        print("you have",numbs[final_predict[0][1]],"anxiety")
        print("you have",numbs[final_predict[0][2]],"stress")

        final_predict_list = final_predict.tolist()

   
        #x=numbs[final_predict[0][0]]
        #y=numbs[final_predict[0][1]])
        #z=numbs[final_predict[0][2]]

        #session['result_values'] = {'final_predict': final_predict_list}
        # return jsonify({'final_predict': final_predict_list})

        # return jsonify({'message': 'GET request sent successfully from Flask to Node.js'})
        url="http://localhost:2000/api/result/student-result"
        data = {'final_predict_list': final_predict_list,
                'userdata':userdetails}

        try:
            response = requests.get(url, json=data, verify=False)
            print(response.text)
            return jsonify({'message': 'GET request sent successfully from Flask to Node.js'})
        except requests.exceptions.RequestException as e:
            return jsonify({'error': str(e)})



    elif request.method == "GET":
        # Add a simple response for GET requests
        return jsonify({'message': 'GET request received. This endpoint is for POST requests.'})

    # Handle other request methods here
    
    return jsonify({'message': 'Unsupported method'})






    # return render_template("index.html")


    # return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)