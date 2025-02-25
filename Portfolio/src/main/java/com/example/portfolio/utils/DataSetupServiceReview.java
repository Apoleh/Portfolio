package com.example.portfolio.utils;

import com.example.portfolio.CommentsSubdomain.DataLayer.Comment;
import com.example.portfolio.CommentsSubdomain.DataLayer.CommentRepository;
import com.example.portfolio.FelixSubdomain.DataLayer.Felix;
import com.example.portfolio.FelixSubdomain.DataLayer.FelixRepository;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.DataLayer.ProjectRepository;
import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import com.example.portfolio.SkillsSubdomain.DataLayer.SkillRepository;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.DataLayer.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final FelixRepository felixRepository;
    private final ProjectRepository projectRepo;
    private  final SkillRepository skillRepo;
    private final UserRepository userRepo;
    private final CommentRepository commentRepository;

    @Override
    public void run(String... args) throws Exception {
        setupFelix();
        setupProjects();
        setupSkills();
        setupUsers();
        setUpComments();
    }

    private void setupFelix() {
        Felix felix1 = buildFelix("felixId1", "Felix", "Zhang", 19,
                "Chinese", "I’ve always been passionate about video games, not just " +
                        "as a player but as someone fascinated by how they’re made. This curiosity " +
                        "led me to coding, where I discovered a love for creating and problem-solving. " +
                        "To me, coding is a way to bring ideas to life, whether that’s crafting game " +
                        "mechanics, developing engaging applications, or tackling real-world challenges. " +
                        "Combining my love for games with my coding skills inspires me to push " +
                        "boundaries and create experiences that others can enjoy, just as I’ve " +
                        "enjoyed so many myself.");

        Flux.just(felix1)
                .flatMap(felix -> {
                    return felixRepository.findFelixByFelixId(felix.getFelixId())
                            .doOnTerminate(() -> System.out.println("Terminated: " + felix.getFelixId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting review: " + felix.getFelixId());
                                return felixRepository.save(felix); // Save if review doesn't exist
                            }));
                })
                .subscribe();
    }


    private Felix buildFelix(String felixId, String firstName, String lastName, int age, String nationality, String aboutMe) {
        return Felix.builder()
                .felixId(felixId)
                .firstName(firstName)
                .lastName(lastName)
                .age(age)
                .nationality(nationality)
                .aboutMe(aboutMe)
                .build();
    }



    ClassPathResource cpr1 = new ClassPathResource("images/Portfolio.png");
    String cpr2 = "images/Portfolio.png";


    //Projects
    private void setupProjects() throws IOException {
        Project project1 = buildProject(
                "projectId1",
                "Portfolio Website",
                "A personal portfolio showcasing my projects, skills, and experience.",
                "https://i.postimg.cc/W4hLFW77/image-2025-02-03-221957954.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").build(),
                        Skill.builder().skillId("skillId3").skillName("React").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").build()
                ),
                "https://github.com/Apoleh/Portfolio"

        );

        Project project2 = buildProject(
                "projectId2",
                "NoodleStar",
                "A web site to handle the orders for the restaurant noodle Star",
                "https://i.postimg.cc/KYhWNGZZ/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").build(),
                        Skill.builder().skillId("skillId3").skillName("React").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").build()
                ),
                "https://github.com/Sunveerg/Noodle-Star"
        );

        Project project3 = buildProject(
                "projectId3",
                "Champlain Pet Clinic",
                "A web site to handle champlain's pet clinic",
                "https://i.postimg.cc/htghqdn5/image-2025-02-11-140714380.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").build(),
                        Skill.builder().skillId("skillId3").skillName("React").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").build()
                ),
                "https://github.com/cgerard321/champlain_petclinic"
        );

        Flux.just(project1, project2, project3)
                .flatMap(project -> projectRepo.findByProjectId(project.getProjectId())
                        .flatMap(existingProject -> projectRepo.delete(existingProject).thenReturn(project)) // Delete the old project
                        .switchIfEmpty(Mono.just(project)) // If no existing project, proceed with saving
                        .flatMap(projectRepo::save) // Save the new project
                )
                .subscribe();
    }

    private Project buildProject(String projectId, String projectName, String description, String imageUrl, List<Skill> skills, String projectLink) {
        return Project.builder()
                .projectId(projectId)
                .projectName(projectName)
                .description(description)
                .imageUrl(imageUrl)
                .skills(skills)
                .projectLink(projectLink)
                .build();
    }




    //skill
    private void setupSkills() {
        Skill java = buildSkill("skillId1", "Java");
        Skill springBoot = buildSkill("skillId2", "Spring Boot");
        Skill react = buildSkill("skillId3", "React");
        Skill typescript = buildSkill("skillId4", "TypeScript");
        Skill mongodb = buildSkill("skillId5", "MongoDb");
        Skill javascript = buildSkill("skillId6", "JavaScript");
        Skill mysql = buildSkill("skillId7", "Mysql");
        Skill dotnet = buildSkill("skillId8", ".Net");
        Skill cshtml = buildSkill("skillId9", "csHtml");
        Skill azure = buildSkill("skillId10", "Azure");
        Skill csharp = buildSkill("skillId11", "C#");
        Skill python = buildSkill("skillId12", "Python");
        Skill unity = buildSkill("skillId13", "Unity");
        Skill C = buildSkill("skillId14", "C++");
        Skill android = buildSkill("skillId15", "Android");

        Flux.just(java, springBoot, react, typescript, mongodb, javascript, mysql, dotnet, cshtml, azure, csharp, python, unity, C, android)
                .flatMap(skill -> skillRepo.findBySkillId(skill.getSkillId())  // Find if skill already exists
                        .flatMap(existingSkill -> skillRepo.delete(existingSkill)  // Delete existing skill if found
                                .thenReturn(skill))  // Return the current skill to save
                        .switchIfEmpty(Mono.just(skill))  // If skill doesn't exist, proceed to save the new skill
                        .flatMap(skillRepo::save)  // Save the new skill
                )
                .subscribe();
    }

    private Skill buildSkill(String skillId, String skillName) {
        return Skill.builder()
                .skillId(skillId)
                .skillName(skillName)
                .build();
    }

    private void setupUsers() {
        User user3 = buildUser("userId3", "leopold@example.com", "Leopold", "Miller", List.of("Customer"), null);
        User user4 = buildUser("userId4", "samuel@example.com", "Samuel", "Taylor", List.of("Staff"), null);
        User user5 = buildUser("userId5", "samantha@example.com", "Samantha", "Lee", List.of("Customer"), List.of("read"));
        Flux.just( user3, user4, user5)
                .flatMap(user -> {
                    System.out.println("Checking if user exists: " + user.getUserId());

                    // Check if the user already exists by userId (or email)
                    return userRepo.findByUserId(user.getUserId()) // Assuming userId is the unique identifier
                            .doOnTerminate(() -> System.out.println("Terminated: " + user.getUserId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting user: " + user.getUserId());
                                return userRepo.save(user); // Save if user doesn't exist
                            }));
                })
                .subscribe();
    }


    private User buildUser(String userId, String email, String firstName, String lastName, List<String> roles, List<String> permissions) {
        return User.builder()
                .userId(userId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .roles(roles)
                .permissions(permissions)
                .build();
    }

    private void setUpComments(){
        Comment comment1 = buildComment("commentId1", "John Doe", LocalDate.now(), "Wow!");
        Comment comment2 = buildComment("commentId2", "Jane Dane", LocalDate.now(), "Cool!");
        Comment comment3 = buildComment("commentId3", "Felix Zhang", LocalDate.now(), "Nice!");

        Flux.just(comment1, comment2, comment3)
                .flatMap(comment -> {
                    System.out.println("Checking if comment exists: " + comment.getCommentId());

                    return commentRepository.findCommentByCommentId(comment.getCommentId())
                            .doOnTerminate(() -> System.out.println("Terminated: " + comment.getCommentId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting comment: " + comment.getCommentId());
                                return commentRepository.save(comment);
                            }));
                })
                .subscribe();
    }

    private Comment buildComment(String commentId, String author, LocalDate date, String comment) {
        return Comment.builder()
                .commentId(commentId)
                .author(author)
                .date(date)
                .comment(comment)
                .isApproved(false)
                .build();
    }
}




