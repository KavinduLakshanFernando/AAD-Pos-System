import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(urlPatterns = "/order")
public class OrderServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            ResultSet resultSet = connection.prepareStatement("select max( orderId ) as max_order_id from orders").executeQuery();
            if (resultSet.next()) {
                String maxOrderId = resultSet.getString("max_order_id");
                System.out.println(maxOrderId);
                out.write(maxOrderId);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String orderId = req.getParameter("oid");
        String customerId = req.getParameter("cid");
        String total = req.getParameter("tot");
        System.out.println(orderId + " " + customerId + " " + total);
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            PreparedStatement preparedStatement = connection.prepareStatement("insert into orders values(?,?,?)");
            preparedStatement.setString(1, orderId);
            preparedStatement.setString(3, customerId);
            preparedStatement.setString(2, total);
            preparedStatement.executeUpdate();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}