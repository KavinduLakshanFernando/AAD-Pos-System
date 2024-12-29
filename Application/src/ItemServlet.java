import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import static java.lang.Class.forName;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        PrintWriter out = resp.getWriter();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            ResultSet resultSet = connection.prepareStatement("select * from item").executeQuery();

            while (resultSet.next()) {
                String code = resultSet.getString(1);
                String description = resultSet.getString(2);
                String price = resultSet.getString(3);
                String qty = resultSet.getString(4);

                JsonObjectBuilder item = Json.createObjectBuilder();
                item.add("code", code);
                item.add("description", description);
                item.add("price", price);
                item.add("qty", qty);
                jsonArrayBuilder.add(item);

            }
            out.write(jsonArrayBuilder.build().toString());
        } catch (ClassNotFoundException ex) {
            throw new RuntimeException(ex);
        } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String code = req.getParameter("code");
        String description = req.getParameter("description");
        String price = req.getParameter("price");
        String qty = req.getParameter("qty");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            PreparedStatement preparedStatement = connection.prepareStatement("insert into item (code, description, price, qty) values(?,?,?,?)");
            preparedStatement.setString(1, code);
            preparedStatement.setString(2, description);
            preparedStatement.setString(3, price);
            preparedStatement.setString(4, qty);
            System.out.println(code + " " + description + " " + price + " " + qty);
            preparedStatement.executeUpdate();


        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonObject jsonObject = Json.createReader(req.getReader()).readObject();
        String code = jsonObject.getString("code");
        String description = jsonObject.getString("description");
        String price = jsonObject.getString("price");
        String qty = jsonObject.getString("qty");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            PreparedStatement preparedStatement = connection.prepareStatement("update item set description=?,price=?,qty=? where code=?");
            preparedStatement.setString(1, description);
            preparedStatement.setString(2, price);
            preparedStatement.setString(3, qty);
            preparedStatement.setString(4, code);
            preparedStatement.executeUpdate();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String code = req.getParameter("code");
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            PreparedStatement preparedStatement = connection.prepareStatement("delete from item where code=?");
            preparedStatement.setString(1, code);
            preparedStatement.executeUpdate();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }
}
