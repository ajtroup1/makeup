using Microsoft.VisualStudio.TextTemplating;

namespace makeup
{
    public class ConnectionString
    {
        public string cs {get; set;}
        public ConnectionString(){
            string host="l0ebsc9jituxzmts.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string user="avr8kl2qthjf8xom";
            string pass="uakq5xg6zrnl9lq2";
            string database="ag25g9e18xowygy8";
            string port="3306";

            cs=$"server={host};user={user};database={database};port={port};password={pass}";
        }
    }
}