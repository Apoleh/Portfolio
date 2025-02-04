package com.example.portfolio.utils;

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
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final FelixRepository felixRepository;
    private final ProjectRepository projectRepo;
    private  final SkillRepository skillRepo;
    private final UserRepository userRepo;

    @Override
    public void run(String... args) throws Exception {
        setupFelix();
        setupProjects();
        setupSkills();
        setupUsers();
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
                "https://i.postimg.cc/mgHqCzWX/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("React").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg").build()
                )
        );

        Project project2 = buildProject(
                "projectId2",
                "NoodleStar",
                "A web site to handle the orders for the restaurant noodle Star",
                "https://i.postimg.cc/KYhWNGZZ/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("React").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg").build()
                )
        );

        Project project3 = buildProject(
                "projectId3",
                "Football Heritage",
                "First full Stack project abour football",
                "https://i.postimg.cc/gcgfWbKD/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("React").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("Javascript").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("Mysql").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg").build()
                )
        );

        Project project4 = buildProject(
                "projectId4",
                "Artwork Project",
                ".Net project that handle the sell of artworks",
                "https://i.postimg.cc/LhdbJN79/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName(".net").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-plain.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("csHtml").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("Azure").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("C#").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("Mysql").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg").build()
                )
        );

        Flux.just(project1, project2, project3, project4)
                .flatMap(project -> projectRepo.findByProjectId(project.getProjectId())
                        .switchIfEmpty(Mono.defer(() -> {
                            System.out.println("Inserting project: " + project.getProjectId());
                            return projectRepo.save(project);
                        }))
                )
                .subscribe();
    }

    private Project buildProject(String projectId, String projectName, String description, String imageUrl, List<Skill> skills) {
        return Project.builder()
                .projectId(projectId)
                .projectName(projectName)
                .description(description)
                .imageUrl(imageUrl)
                .skills(skills)
                .build();
    }




    //skill
    private void setupSkills() {
        Skill java = buildSkill("skillId1", "Java", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg");
        Skill springBoot = buildSkill("skillId2", "Spring Boot", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg");
        Skill react = buildSkill("skillId3", "React", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg");
        Skill typescript = buildSkill("skillId4", "TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg");
        Skill mongodb = buildSkill("skillId5", "MongoDb", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg");
        Skill javascript = buildSkill("skillId6", "JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@");
        Skill mysql = buildSkill("skillId7", "Mysql", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg");
        Skill dotnet = buildSkill("skillId8", ".Net", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-plain.svg");
        Skill cshtml = buildSkill("skillId9", "csHtml", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg");
        Skill azure = buildSkill("skillId10", "Azure", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg");
        Skill csharp = buildSkill("skillId11", "C#", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg");
        Skill python= buildSkill("skillId12", "Python", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg");
        Skill untiy= buildSkill("skillId13", "Unity", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg");
        Skill C= buildSkill("skillId14", "C++", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg");
        Skill android= buildSkill("skillId15", "Android", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg");

        Flux.just(java, springBoot, react, typescript, mongodb, javascript, mysql, dotnet, cshtml, azure, csharp, python, untiy, C, android)
                .flatMap(skill -> skillRepo.findSkillById(skill.getSkillId())
                        .switchIfEmpty(Mono.defer(() -> {
                            System.out.println("Inserting skill: " + skill.getSkillId());
                            return skillRepo.save(skill);
                        }))
                )
                .subscribe();
    }

    private Skill buildSkill(String skillId, String skillName, String skillLogo) {
        return Skill.builder()
                .skillId(skillId)
                .skillName(skillName)
                .skillLogo(skillLogo)
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
}




