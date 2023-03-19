using System.Text;

namespace Dev_Backend.Utils.WherePredicate
{


    public class ColumnDbName : Attribute
    {
        private string _columnName { get; set; }
        public string ColumnName
        {
            get
            {
                return _columnName;
            }
        }

        public ColumnDbName(string columnName)
        {
            this._columnName = columnName;
        }
    }
}