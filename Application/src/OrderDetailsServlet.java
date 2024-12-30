import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.*;
import java.util.Date;

@WebServlet(urlPatterns = "/orderDetails")
public class OrderDetailsServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    String orderId = req.getParameter("oid");
    String code = req.getParameter("Iid");
        System.out.println(orderId + " " + code);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            PreparedStatement preparedStatement = connection.prepareStatement("insert into orderdetails values(?,?)");
            preparedStatement.setString(1, orderId);
            preparedStatement.setString(2, code);
            preparedStatement.executeUpdate();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
