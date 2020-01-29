/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aimdek.service;
import com.aimdek.model.JDBCModel;
import com.aimdek.persistance.JDBCPersistanceImpl;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Bhargav Baldev
 */
public class service extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String firstName=request.getParameter("firstname");
            String lastName=request.getParameter("lastname");
            String password=request.getParameter("password");
            int op = Integer.parseInt(request.getParameter("operation"));
            
            if(op==1){
               boolean result= insert(firstName,lastName,password);
               if(result==true){
               out.println("inserted successfully");
               }
            }
            if(op==2){
              boolean result =   update( firstName, lastName, password);
            }
            if(op==3){
                boolean result= delete( firstName, lastName, password);
            }
            if(op==4){
                boolean result = read( firstName, lastName, password);    
            }
        }
    }
public boolean insert(String firstName,String lastName,String password) {
		
		JDBCModel e=new JDBCModel();
		JDBCPersistanceImpl jp=new JDBCPersistanceImpl();
		
		e.setFirstName(firstName);
		e.setLastName(lastName);
		e.setPassword(password);
		jp.insert(e);
		
		return true;
	}
public boolean update(String firstName,String LastName,String password) {
		
		JDBCModel e=new JDBCModel();
                JDBCPersistanceImpl jp=new JDBCPersistanceImpl();
		e.setFirstName(firstName);
		e.setLastName(LastName);
		e.setPassword(password);
                jp.update();
		return true;
	}
public boolean delete(String firstName,String LastName,String password) {
		
		JDBCModel e=new JDBCModel();
		JDBCPersistanceImpl jp=new JDBCPersistanceImpl();
                e.setFirstName(firstName);
		e.setLastName(LastName);
		e.setPassword(password);
		jp.delete();
                return true;
	}
public boolean read(String firstName,String LastName,String password) {
		
		JDBCModel e=new JDBCModel();
		JDBCPersistanceImpl jp=new JDBCPersistanceImpl();
                e.setFirstName(firstName);
		e.setLastName(LastName);
		e.setPassword(password);
		jp.read();
                return true;
	}
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
