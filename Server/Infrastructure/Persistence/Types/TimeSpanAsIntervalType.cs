using System.Data.Common;
using NHibernate.Engine;
using NHibernate.SqlTypes;
using NHibernate.UserTypes;

namespace Server.Infrastructure.Persistence.Types
{
    public class TimeSpanAsIntervalType : IUserType
    {
        public SqlType[] SqlTypes => [ new SqlType(System.Data.DbType.Object) ];
        public Type ReturnedType => typeof(TimeSpan);
        public bool IsMutable => false;

        public object NullSafeGet(DbDataReader rs, string[] names, ISessionImplementor session, object owner)
        {
            var ordinal = rs.GetOrdinal(names[0]);
            if (rs.IsDBNull(ordinal))
                return TimeSpan.Zero;

            return rs.GetFieldValue<TimeSpan>(ordinal);
        }

        public void NullSafeSet(DbCommand cmd, object value, int index, ISessionImplementor session)
        {
            var parameter = cmd.Parameters[index];
            if (value == null)
            {
                parameter.Value = DBNull.Value;
            }
            else
            {
                parameter.Value = (TimeSpan)value;
                parameter.DbType = System.Data.DbType.Object;
            }
        }

        public object DeepCopy(object value) => value;
        public object Replace(object original, object target, object owner) => original;
        public object Assemble(object cached, object owner) => cached;
        public object Disassemble(object value) => value;
        public new bool Equals(object x, object y) => object.Equals(x, y);
        public int GetHashCode(object x) => x?.GetHashCode() ?? 0;
    }
}
