/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aimdek.persistance;
import com.aimdek.model.*;
import java.sql.*;
/**
 *
 * @author Bhargav Baldev
 */
public class JDBCPersistanceImpl implements JDBCPersistance{

    @Override
    public boolean update() {
       try {
           Connection con=JDBCSingleton.getConnection();
	PreparedStatement stmt=con.prepareStatement("UPDATE TABLE login SET firstName=,lastName=,password="); 
	int i = stmt.executeUpdate();
        if(i>=0){
        return true;
        }
        return false;
	} catch (SQLException e) {
	e.printStackTrace();
	return false;
	}
    }

    @Override
    public boolean delete() {
        try {Connection con=JDBCSingleton.getConnection();
			PreparedStatement stmt=con.prepareStatement("DELETE FROM login WHERE id="); 
			int i = stmt.executeUpdate();
                        if(i>=0){
                        return true;
                        }
                        return false;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
    }

    @Override
    public boolean insert(JDBCModel e) {
        try {Connection con=JDBCSingleton.getConnection();
			PreparedStatement stmt=con.prepareStatement("INSERT INTO login (firstName,lastName,password) VALUES (?,?,?)");
			stmt.setString(1,e.getFirstName());
			stmt.setString(2,e.getLastName());
			stmt.setString(3,e.getPassword());
			
			int i=stmt.executeUpdate();
			if(i>=0)
			{
				return true;
			}
			return false;
		} catch (SQLException f) {
			f.printStackTrace();
			return false;
		}
    }

    @Override
    public boolean read() {
    try {Connection con=JDBCSingleton.getConnection();
			PreparedStatement stmt=con.prepareStatement("SELECT * FROM login WHERE id="); 
			stmt.execute();
                        return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
    }
    
}
