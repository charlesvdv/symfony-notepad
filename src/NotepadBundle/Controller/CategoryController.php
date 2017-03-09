<?php

namespace NotepadBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use NotepadBundle\Entity\Category;
use NotepadBundle\Entity\Note;

class CategoryController extends Controller
{
    /**
     * @Route("/categories", name="categories")
     */
    function categoriesAction() {
        $em = $this->getDoctrine()->getManager();

        $categories = $em->getRepository('NotepadBundle:Category')->findAll();
        if (!$categories) {
            $this->addFlash('notice', 'Error while fetching categories.');
        }

        return $this->render('NotepadBundle:Default:categories.html.twig',
            array('categories' => $categories));
    }

    /**
     * @Route("/add-category", name="add-category")
     */
    function addCategoryAction(Request $request) {
        $category = new Category();
        return $this->categoryFormHelper($request, $category, 'Add a new category');
    }


    /**
     * @Route("/modify-category/{id}", name="modify-category")
     */
    function modifyCategoryAction(Request $request, Category $category) {
        return $this->categoryFormHelper($request, $category, 'Update category');
    }

    /**
     * @Route("delete-category/{id}", name="delete-category")
     */
    function deleteCategoryAction(Category $category) {
        if (!$category) {
            $this->addFlash('notice', 'Could not find this note!');
        }

        $em = $this->getDoctrine()->getEntityManager();
        $em->remove($category);
        $em->flush();

        return $this->redirect('/categories');
    }

    function categoryFormHelper(Request $request, Category $category, $title) {
        $form = $this->createFormBuilder($category)
            ->add('name', TextType::class)
            ->add('submit', SubmitType::class, array('label' => 'Save'))
            ->getForm();

        $form->handleRequest($request);
        $category = $form->getData();

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($category);
            $em->flush();
            return $this->redirect('/categories');
        }
        return $this->render('NotepadBundle:Default:add-category.html.twig',
            array('form' => $form->createView(), 'title' => $title));
    }
}
