CREATE DATABASE [OnlineFoodDelivery]
GO

USE [OnlineFoodDelivery]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DeliveryAgents](
	[AgentId] [bigint] IDENTITY(1,1) NOT NULL,
	[RestaurantId] [bigint] NULL,
	[AgentName] [varchar](30) NOT NULL,
	[AgentPhone] [varchar](11) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AgentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Items](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[RestaurantId] [bigint] NULL,
	[ItemName] [varchar](50) NOT NULL,
	[Price] [decimal](18, 0) NOT NULL,
	[ItemDescription] [varchar](200) NOT NULL,
	[ItemImg] [varchar](255) NULL,
	[isAvailable] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Orders](
	[OrderId] [bigint] IDENTITY(1,1) NOT NULL,
	[RestaurantId] [bigint] NULL,
	[AgentId] [bigint] NULL,
	[UserId] [bigint] NULL,
	[PaymentMode] [varchar](20) NOT NULL,
	[TotalPrice] [decimal](18, 0) NOT NULL,
	[OrderStatus] [varchar](20) NOT NULL,
	[OrderDate] [date] NOT NULL DEFAULT GETDATE(),
PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Restaurants](
	[RestaurantId] [bigint] IDENTITY(1,1) NOT NULL,
	[RestaurantName] [varchar](50) NOT NULL,
	[PhoneNumber] [varchar](10) NOT NULL,
	[RestaurantAddress] [varchar](100) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[RestaurantImg] [varchar](255) NULL,
	[UserId] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[RestaurantId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Users](
	[UserId] [bigint] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[PhoneNumber] [varchar](10) NOT NULL,
	[EmailId] [varchar](50) NOT NULL,
	[UserPassword] [varchar](50) NOT NULL,
	[UserAddress] [varchar](100) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[UserRole] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[EmailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO











