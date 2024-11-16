using System.ComponentModel.DataAnnotations;
using Chess.Enums;

namespace Chess.Models.Entities;

public class TimeControl
{
    [Key]
    public TimeControlType Type { get; set; }
    public ulong Time { get; set; }
    public ulong Increment { get; set; }
}