/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aimdek.persistance;
import com.aimdek.model.JDBCModel;
/**
 *
 * @author Bhargav Baldev
 */
public interface JDBCPersistance {

	boolean update();
	boolean delete();
	boolean insert(JDBCModel e);
	boolean read();
}

