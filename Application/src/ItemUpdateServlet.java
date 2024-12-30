import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.json.Json;
import javax.json.JsonObject;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/itemUpdate")
public class ItemUpdateServlet extends HttpServlet {
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonObject jsonObject = Json.createReader(req.getReader()).readObject();
        String Iid = jsonObject.getString("Iid");
        String qty = jsonObject.getString("qty");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/foodcity", "root", "Ijse@1234");
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE item SET qty = qty - ? WHERE code = ?");

            System.out.println(qty);
            preparedStatement.setString(1, qty);
            preparedStatement.setString(2, Iid);
            preparedStatement.executeUpdate();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
