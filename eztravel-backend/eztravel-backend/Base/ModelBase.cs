namespace eztravel_backend.Base;

public class ModelBase
{
    public string Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }

    public ModelBase()
    {
        Id = Guid.NewGuid().ToString();
        Created = Updated = DateTime.UtcNow;
    }
}