# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




1. Create tables in your SQL DB

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Measure](
	[MeasureId] [int] NOT NULL,
	[MeasureName] [varchar](255) NULL,
	[MeasureSubject] [varchar](255) NULL,
	[MeasureDescription] [varchar](255) NULL,
	[MeasureStatus] [varchar](10) NULL,
	[MeasureResults] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[MeasureId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Vote]    Script Date: 8/13/2023 5:12:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Vote](
	[VoteId] [int] NOT NULL,
	[VoterName] [varchar](255) NULL,
	[MeasureId] [int] NULL,
	[Vote] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[VoteId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UC_VoterNameMeasureId] UNIQUE NONCLUSTERED 
(
	[VoterName] ASC,
	[MeasureId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Vote]  WITH CHECK ADD FOREIGN KEY([MeasureId])
REFERENCES [dbo].[Measure] ([MeasureId])
GO


2. Set the connection string in Counsel.DAL.TribcouncilmeasuresContext in method OnConfiguring.

3. 
open CounselWebApp and Counsel.Dal solution visual studio sepeartely , 
on hitting start launches browser with Counswl.dal api and   Vite + React App.

4. CounselVoting.Api exposes 
 - Allow for creation of Measure (added name (friendly name extra)
- Allow to Add vote (give name. Vote (YES/NO) measure Id (dropdown from GET Measures)


5. Table named Rule is missing, it will have RuleId, RuleDetails. 
Measure should have foreign key of RuleId. 
So whenever a vote casted RuleId can be checked and business logic can evaluate if vote is valid or not.

Depending on the RuleId person choose there should be specific columns to be set in Measure table 
Note Rules are not applied in my implementation but if they are to be applied there is basically two type of rules
If the rules are fixed and we wont be letting user add new rules we can choose following design
A => with data
e.g Uploading of a picture for the measure PictureRequired(True/false) so every voteId requires pictureId generated.
e.g veto power VetoPowerid (vpid) add values to vetopower table with vpid, measureid and person name
B => without data 
a. Minimum number of votes required
b. Minimum percentage of yes votes
can be just added to BL since no data attached.
Minimum  and Max time duration column should be set anyway with defaults in place that allow deletions any time.


So basically Measure table will be 
	[MeasureId] [int] NOT NULL,
	[MeasureName] [varchar](255) NULL,
	[MeasureSubject] [varchar](255) NULL,
	[MeasureDescription] [varchar](255) NULL,
	[MeasureStatus] [varchar](10) NULL,
	[MeasureResults] [varchar](10) NULL, 
RuleId Int, 
Upload pictureId int (0 default),
vetopowerId (0 default)
Min time duration (0:0:0) default let BL not make this as applicable min or max
Maxtime duration (0:0:0) default

RuleId will be the key to validate all inputs to the Measure table and rule table Pictures table, VetoPower table.

Further improvements:

- table with correct number of columns
- front-end UI validation
- try catches in service handler and return deafults
- Business layer to isolate business logic
- server side cache to reduce calls to DB like last measure Id
- unit testing
- data transfer objects to minimise the data transfer
- configuration file to handle connection string and other configured data for all projs







 





 



 


