/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aimdek.model;
import java.sql.*;

/**
 *
 * @author Bhargav Baldev
 */

public class JDBCSingleton {
	
    public static final String URL = "jdbc:mysql://localhost:3306/bhargav";
    public static final String USER = "root";
    public static final String UPASSWORD = "root";
    
    public static Connection getConnection()
    {
		try 
		{  
			Class.forName("com.mysql.jdbc.Driver");
			return DriverManager.getConnection(URL,USER,UPASSWORD);
		} 
		catch (Exception ex) 
		{ 
			ex.printStackTrace();
			return null;
		}
	}

}
