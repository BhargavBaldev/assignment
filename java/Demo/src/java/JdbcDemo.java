
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Bhargav Baldev
 */
public class JdbcDemo {
     static int count=1;  
    static int  choice;
    public static Connection getConnection() throws ClassNotFoundException, SQLException{
    Connection con=null;  
              Class.forName("com.mysql.jdbc.Driver");  
              con= DriverManager.getConnection("jdbc:mysql://localhost:3306/bhargav", "root", "root");  
         return con;
 
    }
    public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {  
          
        
            
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));  
   do{   
        System.out.println("DATABASE OPERATIONS");  
        System.out.println(" --------------------- ");  
        System.out.println(" 1. Insertion ");  
        System.out.println(" 2. View      ");  
        System.out.println(" 3. Delete    ");  
        System.out.println(" 4. Update    ");  
        System.out.println(" 5. Exit      ");  
          
        System.out.print("\n");  
        System.out.print("Please enter the choice what you want to perform in the database: ");  
          
        choice=Integer.parseInt(br.readLine());  
        switch(choice) {  
              
           case 1:{  
                    System.out.print("Enter the username you want to insert data into the database: ");  
                    String username=br.readLine();  
                    System.out.print("Enter the password you want to insert data into the database: ");  
                    String password=br.readLine();  
                      
                    try {  
                            int i= insert(username, password);  
                            if (i>0) {  
                            System.out.println((count++) + " Data has been inserted successfully");  
                            }else{  
                                System.out.println("Data has not been inserted ");      
                            }  
                          
                        } catch (Exception e) {  
                          System.out.println(e);  
                        }  
                      
                     System.out.println("Press Enter key to continue...");  
                     System.in.read();  
                       
                   }//End of case 1  
                   break;  
            case 2:{  
                    System.out.print("Enter the username : ");  
                    String username=br.readLine();  
               
                    try  {  
                            view(username);  
                         } catch (Exception e) {  
                          System.out.println(e);  
                        }  
                     System.out.println("Press Enter key to continue...");  
                     System.in.read();  
                       
                   }//End of case 2  
                  break;  
             case 3:{  
                     System.out.print("Enter the username,  you want to delete: ");  
                     String username=br.readLine();  
             
                     try {  
                            int i= delete(username);  
                            if (i>0) {  
                            System.out.println((count++) + " Data has been deleted successfully");  
                            }else{  
                                System.out.println("Data has not been deleted");      
                            }  
                          
                         } catch (Exception e) {  
                          System.out.println(e);  
                         }  
                     System.out.println("Press Enter key to continue...");  
                     System.in.read();  
                       
                    }//End of case 3  
                   break;  
             case 4:{  
                    System.out.print("Enter the username,  you want to update: ");  
                    String username=br.readLine();  
                    System.out.print("Enter the new password ");  
                    String password=br.readLine();  
                      
                    try {  
                            int i= update(username, password);  
                            if (i>0) {  
                            System.out.println((count++) + " Data has been updated successfully");  
                            }  
                          
                        } catch (Exception e) {  
                          System.out.println(e);  
                        }  
                     System.out.println("Press Enter key to continue...");  
                     System.in.read();  
                      
                   }// end of case 4  
                 break;  
                   
             default:  
                     return;  
        }  
          
       } while (choice!=4);   
   }
    
    //to insert the record into the database   
          public static int insert(String name, String pass) throws SQLException  
          {  
              Connection c=null;  
                
              PreparedStatement ps=null;  
                
              int recordCounter=0;  
                
              try {  
                    
                      c=getConnection();
                      ps=c.prepareStatement("insert into login(uname,upassword)values(?,?)");  
                      ps.setString(1, name);  
                      ps.setString(2, pass);  
                      recordCounter=ps.executeUpdate();  
                        
              } catch (Exception e) { e.printStackTrace(); } finally{  
                    if (ps!=null){  
                      ps.close();  
                  }if(c!=null){  
                      c.close();  
                  }   
              }  
             return recordCounter;  
          }  
  
//to view the data from the database        
      public static  void view(String name) throws SQLException  
      {  
                 Connection con = null;
        PreparedStatement ps = null;  
        ResultSet rs = null;  
                  
                try {  
                      
                          con=getConnection();
                        ps=con.prepareStatement("select * from login where uname=?");  
                        ps.setString(1, name);  
                        rs=ps.executeQuery();  
                        while (rs.next()) {  
                                  System.out.println("Name= "+rs.getString(1)+"\t"+"Paasword= "+rs.getString(2));      
                         
                        }  
                
          } catch (Exception e) { System.out.println(e);}  
          finally{  
                    if(rs!=null){  
                        rs.close();  
                    }if (ps!=null){  
                      ps.close();  
                  }if(con!=null){  
                      con.close();  
                  }   
                }  
      }  
        
     // to update the password for the given username  
      public static int update(String name, String password) throws SQLException  {  
                Connection c = null;
              PreparedStatement ps=null;  
                
              int recordCounter=0;  
              try {  
                     c=getConnection();
                      ps=c.prepareStatement(" update login set upassword=? where uname='"+name+"' ");  
                      ps.setString(1, password);  
                      recordCounter=ps.executeUpdate();  
              } catch (Exception e) {  e.printStackTrace(); } finally{  
                      
                  if (ps!=null){  
                      ps.close();  
                  }if(c!=null){  
                      c.close();  
                  }   
               }  
             return recordCounter;  
          }  
            
// to delete the data from the database   
         public static int delete(String username) throws SQLException{  
              Connection c=null;  
              PreparedStatement ps=null;  
              int recordCounter=0;  
              try {  
                       c=getConnection();
                      ps=c.prepareStatement(" delete from login where uname='"+username+"' ");  
                      recordCounter=ps.executeUpdate();  
              } catch (Exception e) { e.printStackTrace(); }   
              finally{  
              if (ps!=null){  
                      ps.close();  
             }if(c!=null){  
                      c.close();  
              }   
           }  
             return recordCounter;  
          }  



    
}
