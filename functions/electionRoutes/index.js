const admin = require('firebase-admin');

const express = require('express')
const app = express.Router();

const database = admin.database();
const db = database.ref();

app.route('/info')
		.get(getElectionInfo)

function getElectionInfo(req, res) {
	electionId = req.query.electionId

	if(electionId == null) {
		return getAllElectionInfo(res)
	}
	return getParticularElectionInfo(res, electionId)

}
 
function getAllElectionInfo(res) {
	db
		.child('election')
		.once('value')
		.then((snapshot) => {
			if(snapshot.val() == null) {
				return res.json({
					"success": false,
					"message": "No data till now!"
				})
			}
			return res.send({
				"success": true,
				"message": "Sent election data successfully",
				"data": snapshot.val()
			})
		})
}

function getParticularElectionInfo(res, id) {
	db
		.child('election')
		.child(id)
		.once('value')
		.then((snapshot) => {
			if(snapshot.val() == null) {
				return res.json({
					"success": false,
					"message": "No data till now!"
				})
			}
			return res.send({
				"success": true,
				"message": "Sent election data successfully",
				"data": snapshot.val()
			})
		})
}

module.exports = app