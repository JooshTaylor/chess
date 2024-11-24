﻿// <auto-generated />
using System;
using Chess.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Chess.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241124004635_RemoveTimeRemaining")]
    partial class RemoveTimeRemaining
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("Chess.Models.Entities.Game", b =>
                {
                    b.Property<ulong>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Ending")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("PlayerOneId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("PlayerTwoId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<ulong>("TimeControlIncrement")
                        .HasColumnType("INTEGER");

                    b.Property<ulong>("TimeControlTime")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Winner")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TimeControlTime", "TimeControlIncrement");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Chess.Models.Entities.TimeControl", b =>
                {
                    b.Property<ulong>("Time")
                        .HasColumnType("INTEGER");

                    b.Property<ulong>("Increment")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("Time", "Increment");

                    b.ToTable("TimeControls");

                    b.HasData(
                        new
                        {
                            Time = 100000ul,
                            Increment = 0ul,
                            Type = 0
                        },
                        new
                        {
                            Time = 100000ul,
                            Increment = 1000ul,
                            Type = 0
                        },
                        new
                        {
                            Time = 200000ul,
                            Increment = 1000ul,
                            Type = 0
                        },
                        new
                        {
                            Time = 180000ul,
                            Increment = 0ul,
                            Type = 1
                        },
                        new
                        {
                            Time = 180000ul,
                            Increment = 2000ul,
                            Type = 1
                        },
                        new
                        {
                            Time = 300000ul,
                            Increment = 0ul,
                            Type = 1
                        },
                        new
                        {
                            Time = 600000ul,
                            Increment = 0ul,
                            Type = 2
                        },
                        new
                        {
                            Time = 900000ul,
                            Increment = 10000ul,
                            Type = 2
                        },
                        new
                        {
                            Time = 1800000ul,
                            Increment = 0ul,
                            Type = 2
                        });
                });

            modelBuilder.Entity("Chess.Models.Entities.Game", b =>
                {
                    b.HasOne("Chess.Models.Entities.TimeControl", "TimeControl")
                        .WithMany()
                        .HasForeignKey("TimeControlTime", "TimeControlIncrement")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TimeControl");
                });
#pragma warning restore 612, 618
        }
    }
}