@Posts = new Meteor.Collection('posts');

Schemas.Posts = new SimpleSchema
	rating:
		type:String
		allowedValues:['passes','does not pass','no rating']
		label:'Status'

	title:
		type:String
		max: 60

	year:
        	type: Number
        	min: 1890
        	max: 2020

	urls:
		type: [Object]
		label: "Urls"

	"urls.$.url": 
			type: String
			regEx: SimpleSchema.RegEx.Url
			unique: true
			autoform:
				type: "url"

	notes:
		type: String
		autoform:
			rows: 5

	createdAt: 
		type: Date
		autoValue: ->
			if this.isInsert
				new Date()

	updatedAt:
		type:Date
		optional:true
		autoValue: ->
			if this.isUpdate
				new Date()

#	picture:
#		type: String
#		autoform:
#			afFieldInput:
#				type: 'fileUpload'
#				collection: 'Attachments'

	owner: 
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoValue: ->
			if this.isInsert
				Meteor.userId()
		autoform:
			options: ->
				_.map Meteor.users.find().fetch(), (user)->
					label: user.emails[0].address
					value: user._id

Posts.attachSchema(Schemas.Posts)
